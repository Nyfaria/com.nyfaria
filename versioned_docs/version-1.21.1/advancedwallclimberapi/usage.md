---
title: Usage
slug: /advancedwallclimberapi/usage
---

## Quick Start Guide

### 1. Implement IAdvancedClimber

Make your entity implement `IAdvancedClimber`:

```java
public class MyClimbingMob extends PathfinderMob implements IAdvancedClimber {
    private final ClimberComponent climberComponent;

    public MyClimbingMob(EntityType<? extends MyClimbingMob> type, Level level) {
        super(type, level);
        this.climberComponent = new ClimberComponent(this);
        ClimberHelper.initClimber(this);
    }

    @Override
    public ClimberComponent getClimberComponent() {
        return climberComponent;
    }

    @Override
    public Mob asMob() {
        return this;
    }

    @Override
    public float getMovementSpeed() {
        return (float) getAttributeValue(Attributes.MOVEMENT_SPEED);
    }

    @Override
    public float getBlockSlipperiness(BlockPos pos) {
        return level().getBlockState(pos).getBlock().getFriction() * 0.91f;
    }

    @Override
    public boolean canClimbOnBlock(BlockState state, BlockPos pos) {
        return true; // Or add custom logic for non-climbable blocks
    }
}
```

### 2. Override Required Methods

Override these methods in your entity class:

```java
@Override
protected PathNavigation createNavigation(Level level) {
    ClimberPathNavigator<MyClimbingMob> navigator = new ClimberPathNavigator<>(this, level, false);
    navigator.setCanFloat(true);
    return navigator;
}

@Override
public void aiStep() {
    ClimberHelper.livingTickClimber(this);
    super.aiStep();
}

@Override
public void tick() {
    super.tick();
    ClimberHelper.tickClimber(this);
}

@Override
public void move(MoverType type, Vec3 movement) {
    ClimberHelper.handleMove(this, type, movement, true);
    super.move(type, movement);
    ClimberHelper.handleMove(this, type, movement, false);
}

@Override
public void travel(Vec3 travelVector) {
    if (!ClimberHelper.handleTravel(this, travelVector)) {
        super.travel(travelVector);
    }
    ClimberHelper.postTravel(this, travelVector);
}

@Override
public void jumpFromGround() {
    if (!ClimberHelper.handleJump(this)) {
        super.jumpFromGround();
    }
}

@Override
public BlockPos getOnPos() {
    return ClimberHelper.getAdjustedOnPosition(this, super.getOnPos());
}

@Override
public boolean onClimbable() {
    return false; // Disable vanilla climbing
}
```

### 3. Client-Side Rendering

For proper model orientation, use the render helpers:

```java
    @Override
    public void render(S livingEntity, float entityYaw, float partialTicks, PoseStack poseStack, MultiBufferSource buffer, int packedLight) {
        ClientClimberHelper.onPreRenderLiving(livingEntity, partialTicks, poseStack);
        super.render(renderState, poseStack, buffer, color);
        ClientClimberHelper.onPostRenderLiving(livingEntity, partialTicks, poseStack, multiBufferSource); 
    }
```

### 4. Using with Mixins (for vanilla entities)

If you want to add climbing to vanilla entities like Spider:

```java
@Mixin(Spider.class)
public abstract class SpiderMixin extends Monster implements IAdvancedClimber {
    @Unique
    private ClimberComponent climberComponent;

    protected SpiderMixin(EntityType<? extends Monster> type, Level level) {
        super(type, level);
    }

    @Inject(method = "<init>", at = @At("RETURN"))
    private void onInit(EntityType<?> type, Level level, CallbackInfo ci) {
        this.climberComponent = new ClimberComponent(this);
        ClimberHelper.initClimber(this);
    }

    @Override
    public ClimberComponent getClimberComponent() {
        return climberComponent;
    }

    // ... implement other IAdvancedClimber methods
}
```
See [SpiderMixin](http://github.com/Nyfaria/NyfsSpiders/blob/1.21/Common/src/main/java/com/nyfaria/nyfsspiders/mixin/SpiderMixin.java) for more details.

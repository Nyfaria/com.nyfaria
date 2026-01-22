---
title: API reference
slug: /advancedwallclimberapi/api-reference
---

# API Reference

### IAdvancedClimber Interface

The main interface your entity must implement:

| Method | Description |
|--------|-------------|
| `getClimberComponent()` | Returns the ClimberComponent instance |
| `asMob()` | Returns the entity as a Mob |
| `getMovementSpeed()` | Returns the entity's movement speed |
| `getBlockSlipperiness(BlockPos)` | Returns slipperiness for a block position |
| `canClimbOnBlock(BlockState, BlockPos)` | Whether the entity can climb on a specific block |
| `getOrientation()` | Gets the current orientation |
| `getVerticalOffset(float)` | Gets the vertical offset for rendering |

### ClimberHelper Static Methods

| Method | Description |
|--------|-------------|
| `tickClimber(IAdvancedClimber)` | Call in entity's tick() |
| `livingTickClimber(IAdvancedClimber)` | Call in entity's aiStep() |
| `handleTravel(IAdvancedClimber, Vec3)` | Call in travel(), returns true if handled |
| `postTravel(IAdvancedClimber, Vec3)` | Call after travel() |
| `handleMove(IAdvancedClimber, MoverType, Vec3, boolean)` | Call before/after move() |
| `handleJump(IAdvancedClimber)` | Call in jumpFromGround(), returns true if handled |
| `getAdjustedOnPosition(IAdvancedClimber, BlockPos)` | Get adjusted ground position |

### Movement Controllers

- `ClimberMoveController<T>` - Handles 3D movement
- `ClimberLookController<T>` - Handles looking in local space
- `ClimberJumpController<T>` - Handles jumping from any surface
- `ClimberPathNavigator<T>` - Pathfinding that understands wall climbing

---
title: Installation
slug: /advancedwallclimberapi/installation
---

## Adding AWCAPI to Your Project

### Repository Setup

Add the GitHub Packages repository to your `build.gradle` or `settings.gradle`:

```groovy
repositories {
    maven {
        name = "GitHubPackages"
        url = uri("https://maven.pkg.github.com/Nyfaria/AdvancedWallClimberAPI")
        credentials {
            // Use your GitHub username and a Personal Access Token with read:packages scope
            username = project.findProperty("gpr.user") ?: System.getenv("GITHUB_ACTOR")
            password = project.findProperty("gpr.key") ?: System.getenv("GITHUB_TOKEN")
        }
    }
}
```

### Authentication

GitHub Packages requires authentication even for public packages. Create a Personal Access Token (PAT) with `read:packages` scope:

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate a new token with `read:packages` scope
3. Add to your `~/.gradle/gradle.properties`:

```properties
gpr.user=YOUR_GITHUB_USERNAME
gpr.key=YOUR_PERSONAL_ACCESS_TOKEN
```

### Dependencies

#### Common Module (Multi-loader projects)
```groovy
dependencies {
    compileOnly "com.nyfaria.awcapi:awcapi-common:1.0.0+1.21.1"
}
```

#### Fabric
```groovy
dependencies {
    modImplementation "com.nyfaria.awcapi:awcapi-fabric:1.0.0+1.21.1"
}
```

#### NeoForge
```groovy
dependencies {
    implementation "com.nyfaria.awcapi:awcapi-neoforge:1.0.0+1.21.1"
}
```
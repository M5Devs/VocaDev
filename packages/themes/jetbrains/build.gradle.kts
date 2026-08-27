plugins {
    id("java")
    id("org.jetbrains.intellij") version "1.17.2"
}

group = "dev.voca"
version = "0.1.0"

repositories {
    mavenCentral()
}

intellij {
    version.set("2023.2")
    type.set("IC") // IntelliJ IDEA Community
    plugins.set(listOf(/* Plugins if needed */))
}

tasks {
    withType<JavaCompile> {
        sourceCompatibility = "17"
        targetCompatibility = "17"
    }

    patchPluginXml {
        sinceBuild.set("232")
        untilBuild.set("243.*")
    }

    buildPlugin {
        archiveBaseName.set("vocadev-jetbrains-theme")
    }
}

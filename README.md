# Godot .NET Tools

Generate .NET-related files for your Godot project in VSCode.

## Requirements

- Projects created with <strong>Godot .NET version 4.0+.</strong> 
- Projects created in older versions of Godot are <strong>not</strong> supported.

## Features

- Enables debugging.
- Enables launching Godot directly from VSCode.
- Enables C# code analyzer configuration.

## Installation

Install via the extensions marketplace by searching for:
    
<code>woberg.godot-dotnet-tools</code>

Open the <strong>Command Palette (Ctrl + Shift + P) </strong> and select:

<code>Godot .NET: Generate files for Godot project</code>

![cmd palette command](/images/cmd_palette.png)

In it's default configuration, the extension will generate 3 files inside the <strong>.vscode</strong> folder in the current workspace.

![files](/images/files.png)

### launch.json:
Contains the necessary configurations to launch and debug your Godot application from inside VSCode. [More info](#configuration)

### tasks.json:
Contains a build task, using the dotnet CLI to build your project.

### ruleset.xml:
Contains rules for the C# code analyzer. This is an optional file that was added due to the default C# rule (CA1050), which warns about encapsulating all classes inside namespaces. 

![namespace warning](/images/namespace.png)

In a Godot project this might not necessarily be wanted, and is silenced by default in the added ruleset file.
[More info](#optional)

## Configuration

In the <strong>launch.json</strong> file there is some additional configuration needed. 

You will have to edit the <code>"program"</code> property value to the path of your Godot executable.
Simply replace <code>{EXECUTABLE PATH}</code> with the path to your Godot executable.


![launch.json](/images/launch.png)


### Optional

The <strong>ruleset.xml</strong> file contains one rule ID (CA1050). This rule warns about encapsulating all your classes inside namespaces and is silenced by default. This is optional of course and can be removed if so desired.

![ruleset](/images/ruleset.png)

The ruleset is also added to the <strong>.csproj</strong> file and if the <strong>ruleset.xml</strong> file is removed, the <strong>.csproj</strong> file will need to be edited to resolve any issues related to omnisharp. 

Simply remove the line shown below.

![csproj](/images/csproj.png)

If the <strong>ruleset.xml</strong> is not desired at all, there is a configuration setting available to disable it's generation completely. 
[More info](#extension-settings)

## Launching and debugging

Open the debug view in your VSCode workspace and there should be 3 options available. 

- <strong>"Lauch"</strong> 
- <strong>"Lauch Editor"</strong> 
- <strong>"Attach to process"</strong> 

![debug option](/images/debug.png)

You will now be able to set break points, enabling you to step through your code after launching your project.

![break point](/images/break_point.png)


## Extension Settings

There are 3 available configuration settings for the extension which enable you to choose what files are generated:

- <code>"godot-dotnet-tools.generateTasksFile"</code> 

- <code>"godot-dotnet-tools.generateLaunchFile"</code>

- <code>"godot-dotnet-tools.generateRulesetFile"</code>

All settings are set to <code>true</code> by default.

To override these settings, you can add them to your <strong>settings.json</strong> file set them to false.
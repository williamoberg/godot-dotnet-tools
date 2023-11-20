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
Contains rules for the C# code analyzer. [More info](#optional)


## Configuration

To be able to launch your project, you first need to set the path to your Godot executable in the   user settings. The settings can be found under <strong>Extensions/Godot .Net</strong>.

![settings](/images/settings.png)

Alternatively, you can set the executable path in your <strong>settings.json</strong> file:

![settings.json](/images/settingsjson.png)

## Optional

The generated <strong>ruleset.xml</strong> file contains one rule ID: <code>(CA1050)</code>.

![ruleset](/images/ruleset.png)

This rule warns about encapsulating all your classes inside namespaces. In a Godot project this might not necessarily be wanted, so the rule is silenced by default.

![namespace warning](/images/namespace.png)

For the ruleset to work, it is also added to the <strong>.csproj</strong> file.

The <strong>ruleset.xml</strong> file is of course not necessary and can be deleted if it's not wanted, but if it is, the <strong>.csproj</strong> file will need to be edited to resolve any issues related to omnisharp. 

Simply remove the line shown below.

![csproj](/images/csproj.png)

If the <strong>ruleset.xml</strong> is not desired at all, there is a configuration setting available to disable it's generation completely. 
[More info](#extension-settings)

## Launching and debugging

Open the debug view in your VSCode workspace and there should now be 3 options available. 

- <strong>"Launch"</strong> 
- <strong>"Launch Editor"</strong> 
- <strong>"Attach to process"</strong> 

![debug option](/images/debug.png)

You will now be able to set break points, enabling you to step through your code after launching your project.

![break point](/images/break_point.png)


## Extension Settings

There are 4 available configuration settings for the extension which enable you to set your Godot executable path and choose what files are generated:

- <code>"godot-dotnet-tools.executablePath"</code> 

- <code>"godot-dotnet-tools.generateTasksFile"</code> 

- <code>"godot-dotnet-tools.generateLaunchFile"</code>

- <code>"godot-dotnet-tools.generateRulesetFile"</code>

These configurations are available in the user settings under <strong>Extensions/Godot .NET.</strong>

You can also add and edit them in your <strong>settings.json</strong> file.
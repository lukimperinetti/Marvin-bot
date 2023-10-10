# Marvin

This bot is created by students of the MSc-2026 class in Montpellier.

# Introduction

run it by tiping **nodemon** in the terminal

<h2>What you need</h2>
<ul>
    <li>discord.js</li>
    <li>nodemon</li>
    <li>dotenv</li>
</ul>


First, you will need to create a **config.js** file containing the connection token:
<code>
const token = "THE_TOKEN";
module.exports = { token };
</code>

Once installed, you will need to run **npm install** and install the **discord.js** library.
See <a href="https://discord.js.org/#/">The documentation</a>

<hr>

<!-- # Files

<ul>
    <li>Command = Here you have to write all yours commands</li>
    <li>Loader = Here you have to write all yours handlers (commands loader etc...)</li>
</ul> -->

<hr>

# Contributors
--

# Quick doc
When you create a new command, don't forget to run the command file with **node src/register-commands.js** --> as you can see, your command is now choosable in discor when typing "/..."
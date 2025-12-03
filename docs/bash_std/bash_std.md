# Bash Coding Style Guide and Standard

*Revision: v0.1*

---

## Table of Contents

- [Introduction](#introduction)
- [Shell to use](#shell-to-use#)
    * [Shebang](#shebang)
- [Mandatory rules](#mandatory-rules)
    - [Shell Files and Interpreter Invocation](#shell-files-and-interpreter-invocation)
        - [File Extensions](#file-extensions)
        - [SUID and SGID](#suid-sgid)
    - [Environment](#environment)
        - [STDOUT vs STDERR](#stdout-vs-stderr)
    - [Comments](#comments)
        - [File Header](#file-header)
        - [Function Comments](#function-comments)
        - [Implementation Comments](#implementation-comments)
        - [TODO Comments](#todo-comments)
    - [Naming conventions](#naming-conventions)
        - [Variables naming convention](#variables-naming-convention)
            - [Environment variables naming convention](#environment-variables-naming-convention)
            - [Global variables naming convention](#global-variables-naming-convention)
            - [Local variables naming convention](#local-variables-naming-convention)
            - [Variable defined by a loop, while or for](#variable-defined-by-a-loop-while-or-for)
        - [Function naming convention](#function-naming-convention)
        - [File naming convention](#file-naming-convention)
    - [Code style and format](#code-style-and-format)
        - [Shell Script Structure](#shell-script-structure)
        - [Linting](#linting)
        - [Indentation](#indentation)
        - [Line Length and Long Strings](#line-length-and-long-strings)
        - [Defining variables](#defining-variables)
        - [Pipelines](#pipelines)
        - [Loops](#loops)
        - [Case statement](#case-statement)
        - [Variable expansion](#variable-expansion)
        - [Parameter expansion](#parameter-expansion)
        - [Listing files](#listing-files)
        - [Quoting](#quoting)
- [Beyond the guide](#beyond-the-guide)
    - [ShellCheck](#shellcheck)
    - [SHFMT](#shfmt)
    - [Command Substitution](#command-substitution)
    - [Test, Square Brackets, and double Square Brackets ](#test-square-brackets-and-double-square-brackets)
    - [Testing Strings](#testing-strings)
    - [Wildcard Expansion of Filenames](#wildcard-expansion-of-filenames)
    - [Eval](#eval)
    - [Arrays](#arrays)
        - [Arrays Pros](#arrays-pros)
        - [Arrays Cons](#arrays-cons)
        - [Array Decision](#array-decission)
    - [Pipes to While](#pipes-to-while)
    - [Arithmetic](#arithmetic)
    - [Calling Commands](#calling-commands)
        - [Checking Return Values](#checking-return-values)
        - [Builtin Commands vs External Commands](#builtin-commands-vs-external-commands)
    - [Extended Printing (echo)](#extended-printing-echo)
    - [Default Assignments](#default-assignments)
    - [Argument/Option Parsing](#argument-option-parsing)
	    - [getops](#getops)
	    - [shflags](#shflags)
- [Conclusion](#conclusion)
- [Footnote](#footnote)
- [Glossary](#glossary)
- [ToDo](#todo)

---
<a name="introduction"></a>
# Introduction

Bash is a powerful command shell designed for Unix-based systems and is particularly useful for automating repetitive tasks and interacting with the command line.

Its abilities make it good for tasks like file manipulation, system administration, and running command-line tools or automating command-line tasks.

This guide will cover best practices and standards for creating effective Bash scripts.

---
<a name="shell-to-use"></a>
# Shell to use

Bash is the only shell scripting language recommended to use.

The shebang of a shell script be "*`#!/bin/bash`*".
* Advantages:
	* Use what's provided by the environment. Bash is by default installed on every Linux distribution, macOS, or even Windows (on Windows it is not installed by default, instead, you need to install WSL).
	* "*`bash`*" is more powerful than "*`sh`*".
	* minimum dependencies.

## Shebang

* "*`#!/usr/bin/env bash`*" is more portable and flexbile, as it can run bash from any location on the system, as long as it is in your path (it looks for the default version of bash in your current environment).
	* One possible advantage of using this method is that you can run different versions of bash without changing the shebang line, of example if you have a newer version of bash installed in "*`/usr/local/bin`*".
	* One possible disadvantage is that you may run into compatibility issues or security risks if your path contains a different or malicious version of bash.
* "*`#!/bin/bash`*" will use the explicit path to the bash. This means that it is more reliable and secure, as it will always run the same version of bash regardless of your path.
	* One possible advantage is that you can ensure that your script will run with the same version of bash on any system that has bash installed in "*`/bin`*".
	* One possible disadvantage is that your script may not run on systems that have bash installed in a different location, such as some BSD systems.

---
<a name="mandatory-rules"></a>
# Mandatory rules

| **INFO** |  |
|---|---|
|   | If you are writing a script that is more than 100 lines long or that uses non-straightforward control flow logic, you should rewrite it in a more structured language as soon as possible. Always have in mind that usually, shell scripts _grow_. Rewrite your script early to avoid a more time-consuming rewrite at a later date. In the header section, describe the control flow logic as detailed as possible.
|   | Try to reduce to a minimum the dependencies used in your shell script. Try to use the default tools in your environment.
|   | Try to use libraries and reuse them.
|   | Always write code with the mindset that other people than the author will maintain the script.

* Always double-quote variables. *See [Variable expansion](#variable-expansion) , [Quoting](#quoting) and [Quotes - Greg's Wiki](http://mywiki.wooledge.org/Quotes)[^1]* .
* All code goes into a function. Even if it's one function, "*`main`*".
    * There are some exceptions. If your script is a library script or if the script is extremely simple.
    * Avoid global variables. When you do use global variables, try to define them as "*`read-only`*".
* Always have a `main` function for runnable scripts, called with "*`main`*" "or *`main "$@"`*".
    * If the script is also usable as a library, call it using "*`[[ "${0}" == "${BASH_SOURCE}" ]] && main "${@}"`*".
* Do not use deprecated style:
    * Define functions as "*`my_function() { ... };`*". not "*`function my_function { ...; }`*".
* Use "*`|| true`*" on programs that you intentionally let exit non-zero.
* Avoid ending the command line with a semicolon "*`;`*", this can lead to errors if the command following the semicolon is not valid. For multiple command lines on the same line, it is accepted to use semicolon.
    * Wrong: *`shell_profile="/etc/profile.d/cmuenv.sh";`*
    * Correct: *`command 1; command 2`*
* Always use long parameter notation when available. This makes the script more readable, especially for lesser known/used commands that you don't remember all the options for.

	* Wrong:

	  ```bash
	  rm -rf -- "${dir}"
	  ```


	* Correct:

	  ```bash
	  rm --recursive --force -- "${dir}"
	  ```


* Print error messages on "*`stderr`*".

```bash
error() { printf '%s\n' "$@" | sed 's/^./ERROR: &/' 1>&2; }
```


* Name heredoc tags with what they're part of:

```bash
cat <<HELPMSG
usage $0 [OPTION] ... [ARGUMENT] ...

HELPMSG
```


* Single-quote heredocs leading tag to prevent interpolation of text between them.

```bash
cat <<'MSG'
[...]
MSG
```

* Use Bash variable substitution if possible before "*`awk/sed`*".
* Put "*`then, do`*", etc. on the same line, not new line.
* Cleanup the code
  An idiom for tasks that need to be done before the script ends (e.g. removing temporary files, etc.). The exit status of the script is the status of the last statement *before* the `finish` function.


```bash
finish() {
    result=$?
    # Your cleanup code here
    exit ${result}
}
trap finish EXIT ERR
```

*See [How "Exit Traps" Can Make Your Bash Scripts Way More Robust And Reliable](http://redsymbol.net/articles/bash-exit-traps/)[^2]*


---
<a name="shell-files-interpreter-invocation"></a>
## Shell Files and Interpreter Invocation

---
<a name="file-extensions"></a>
### File Extensions

Executables should have no extension (strongly preferred) or "*`.sh`*" suffix.
Libraries must always have the "*`.sh`*" suffix, and **should not be executable**.

It is unnecessary to know what language a program is written in when executing it, and a shell doesn't require an extension, so we prefer not to use one for executables.

However, libraries need to know what language it is, and sometimes there's a need to have similar libraries in different languages.

This allows library files with similar purposes but different languages to be identically named except for the language-specific suffix.

---
<a name="suid-sgid"></a>
### SUID / SGID

SUID and SGID are *forbidden* on shell scripts.

Too many security issues with the shell make it nearly impossible to secure sufficiently to allow SUID/SGID.

While bash makes it difficult to run SUID, it's still possible on some platforms, so we're being explicit about banning it.

Use "*`sudo`*" to provide elevated access if needed.

---
<a name="environment"></a>
## Environment

---
<a name="stdout-vs-stderr"></a>
### STDOUT vs STDERR

All error messages should go to "*`STDERR`*".

This makes it easier to separate normal status from actual issues.

---
<a name="comments"></a>
## Comments

---
<a name="file-header"></a>
### File Header

Start each file with a description of its contents.


Every file must have a top-level comment, including a brief overview of its contents, the ticket number associated with creating this ticket, or changes to the script.

Also, include instructions on using the script and what to expect from it.


At the beginning of the shell script, you must include the followings:

* Ticket number associated with creating this ticket or changes to the script.
* Write to which version of the bash coding style standard adheres. Use "*`# BashStd`*": e.g. "*`# BashStd: v0.1`*".
* A brief overview of its contents. Use the "*`Info`*" tag: e.g. "*`# Info: read java threads`*".
* Instructions on how to use the shell script. Use the "*`Usage`*" tag: e.g. "*`# Usage: -h for help`*"
* A list with known bugs. Use the "*`KnownBugs`*" tag.
* A ToDo list must be in "*`UpperCamelCase`*" format. While the ToDo items must be formatted with "*`UPPERCASE`*". (It is permitted to add `TODO`s directly in the code as long as it is meant to be temporary. Always use the "*`ToDo`*"  tag to easily find what's left to be done on the script).


ToDo example:

```bash
## ToDo:
## TODO(catalin): fix status exit code for my_function.
```


File Header example:	

```bash
#!/bin/bash
###############################################################################################
##
## UBSCSI-2134
## UBSCSI-2442
##
## Info:
## - Check the validity of the certificates installed in the Java KeyStore and Java TrustStore.
## - Exit status codes (priority order as below):
##   1: cannot read JKS file (this has priority in front of an expired certificate) or any other error
##   2: certificate is expired
##   [ ... ]
##   5: certificate is not yet valid
##
## Usage:
## - executing the script will automatically search for all "java" processes,
##   and it will search for "trustStore" & "keyStore" arguments of the command line.
##   It will also search for "trustStorePassword" & "keyStorePassword" arguments.
##   If the password is not identified, it will use the default password, "changeit".
##   Eg: $ ./java-certificates.sh
##   [ ... ]
##   4. Exit code of certificates that are not yet valid.
##
## ToDo:
## TODO(catalin): detect "keytool" location.
##   [ ... ]
## TODO(catalin): display output when the exit code is zero only if the script is executed in a terminal.
```

---
<a name="function-comments"></a>
### Function Comments

Regardless of length or complexity, any function must be commented on.

It should be sufficient for non-authors to learn how to use your shell script or library just by reading the comments without reading the code.


All function comments should describe the intended behavior using:
* Start with an empty comment ("*`#`*") on the first line.
* Description of the function.
* "*`Globals`*": list of all global variables used and modified.
* "*`Arguments`*": arguments taken.
* "*`Outputs`*": output to STDOUT or STDERR.
* "*`Returns`*": returned values other than the default exit status of the last command run.


Example:

```bash
#
# Read multiple option arguments. If an option has multiple inputs, all the inputs are added to an array.
# Globals: args
# Arguments: none
# Outputs: none
# Returns: none
read_args() {
  #
  # Reset multiple arguments for each option
  unset args
  #
  # Read multiple arguments for option:
  # e.g.: -j java jabaman -l warning 1
  # arguments for option -j is "java jabaman"
  while (($#)) && [[ ${1} != -* ]]; do
    local args+=("${1}")
    shift
  done
}
```

---
<a name="implementation-comments"></a>
### Implementation Comments

Comment tricky, non-obvious, interesting, or important parts of your Code.

Don't comment on everything. Put a short comment in if there's a complex algorithm or you're doing something out of the ordinary.

---
<a name="todo-comments"></a>
### TODO Comments

Use "*`TODO`*" comments for temporary code, a short-term solution, good enough but not perfect, or missing features.

Any "*`TODO`*" should use this tag, followed by the "*firstname.lastname*" (like your CROWD user) and the context about the problem referenced by the "*`TODO`*".

The primary purpose is to have a consistent "*`TODO`*" that can be searched to find out how to get more details upon request.

A "*`TODO`*" is not a commitment that the person referenced will fix the problem. It can also be without any name.


Example:

```
# TODO(catalin): detect "keytool" location.
# TODO(catalin): add store type option when using (--file) option + add passwords parameters per store type.
# TODO: add fallback for default password to an empty password
```

---
<a name="naming-conventions"></a>
## Naming conventions

---
<a name="variable-naming-convention"></a>
### Variable naming convention

**Be aware that you cannot differentiate local variables from global variables and the other way around!**

---
<a name="environment-variable-naming-convention"></a>
#### Environment variable naming convention

Environment variables are using "*`screaming_snake_case`*" (also known as "*`snail_case`*") and "*`upper_case`*" / "*`macro_case`*" / "*`all_caps`*" / "*`constant_case`*" for a single word.
*See [Naming convention (programming) - Wikipedia](https://en.wikipedia.org/wiki/Naming_convention_(programming))[^3]*.

When every letter is capitalized, the words are split with an underscore.

**All other variables should not use these two naming conventions!**

*See [Naming convention (programming) - Wikipedia](https://en.wikipedia.org/wiki/Naming_convention_(programming)#Examples_of_multiple-word_identifier_formats)[^3] & [The Open Group Base Specifications Issue 7, 2018 edition](https://pubs.opengroup.org/onlinepubs/9699919799/)[^4]*


Example:

```bash
THIS_IS_SCREAMING_SNAKE_CASE
UPPERCASE
CMU_ENV=ncdev
LANG=en_US.UTF-8
```

---
<a name="global-variable-naming-convention"></a>
#### Global variable naming convention

A global variable is a variable declared in a shell script.

Global variables can be accessed within a function or any nested blocks of a shell script file.

Global variables must follow "*`snake_case / snail_case / pothole_case`*".
*See [Naming convention (programming) - Wikipedia](https://en.wikipedia.org/wiki/Naming_convention_(programming)#Examples_of_multiple-word_identifier_formats) [^3]*

Example:

```bash
readonly my_variable
readonly variable
readonly my_var='XYZ'
```

**Avoid as much as possible declaring global variables unless necessary! Use `local` variables instead.**

---
<a name="local-variable-naming-convention"></a>
#### Local variable naming convention

Local Variables are declared inside a block of code or function and cannot be called outside its scope.

For example, the local variable is lost once a function is executed, and other functions cannot call it.

Local variables must  follow "*`snake_case / snail_case / pothole_case`*".
*See [Naming convention (programming) - Wikipedia](https://en.wikipedia.org/wiki/Naming_convention_(programming)#Examples_of_multiple-word_identifier_formats) [^3]*


Example:

```bash
local my_var    # This is a local variable
my_var          # This is a global variable
readonly my_var # This is a read-only global variable
```

---
<a name="variable-defined-by-a-loop-while-or-for"></a>
#### Variable defined by a loop, while or for

Variable names for loops should be similarly named for any variable you're looping through.


Example:

```bash
for zone in "${zones[@]}"; do
  something_with "${zone}"
done
```

---
<a name="function-naming-convention"></a>
### Function naming convention

Lowercase, with underscores to separate words. Separate libraries with "*`::`*".

Parentheses are required after the function name. The keyword `function` is deprecated. Therefore it must be avoided.


If writing single functions, use "*`snake_case / snail_case / pothole_case`*" (lowercase and separate words with underscore). If you're writing a package, different names with "*`::`*".
*See [Naming convention (programming) - Wikipedia](https://en.wikipedia.org/wiki/Naming_convention_(programming)#Examples_of_multiple-word_identifier_formats) [^3]*

Braces must be on the same line as the function name and no space between the function name and the parenthesis.


Example:

```bash
# Single function
my_function() {
  [ ... ]
}

# Part of a package
my_package::my_function() {
  [ ... ]
}
```

The `function` keyword is extraneous when "*`()`*" is present after the function name but enhances quick identification of functions.

---
<a name="file-naming-convention"></a>
### File naming convention

The filename of your shell script must adhere to the "*`snake_case / snail_case / pothole_case`*" format.

Since all shell scripts must be executable, the "*`.sh`*" file extension is optional. However, if your shell script is a library, then it is mandatory to have the "*`.sh`*" suffix in the filename, while the file should not have the `execute` flag.

---
<a name="code-style-and-format"></a>
## Code style and format

---
<a name="shell-script-structure"></a>
### Shell Script Structure

Description of a standard shell script template.

| Sections              | Description                 | Code                                                     |
| --------------------- | --------------------------- | -------------------------------------------------------- |
| Shebang               |                             | `#!/bin/bash`                                            |
| Header                | Separator (80 characters)   | `######################################`                 |
|                       | Description                 | `## Template for a simple bash script.`                  |
|                       | Ticket No.                  | `## UBSCSI-525`                                          |
|                       | Bash Style Standard version | `## BashStd: v0.1`                                       |
|                       | Info                        | `## Info: executed via cron job.`                        |
|                       | Usage of the script         | `## Usage: execute the script via a cron job.`           |
|                       | Known Bugs                  | `## KnownBugs: N/A`                                      |
|                       | ToDo(s)                     | `## ToDo:`                                               |
|                       |                             | `## TODO(catalin): add an option for a global variable.` |
| Global Variable(s)    | Separator (80 characters)   | `######################################`                 |
|                       | Section Name                | `## Global Variables`                                    |
|                       | Separator (80 characters)   | `######################################`                 |
|                       | Variable(s)                 | `my_var='String'`                                        |
| Function(s)           | Separator (80 characters)   | `######################################`                 |
|                       | Section Name                | `## Function(s)`                                         |
|                       | Separator (80 characters)   | `######################################`                 |
|                       | Function                    | `my_function() {`                                        |
|                       | *The actual code*           | `local my_var='true'`                                    |
|                       |                             | `if [[ ${my_var} == 'true' ]]; then`                     |
|                       |                             | `printf 'Local variable: my_var.\n'`                     |
|                       |                             | `fi`                                                     |
|                       |                             | `}`                                                      |
|                       | `main` function             | `main() {`                                               |
|                       | *code / call function(s)*   | `printf "my_var is a ${my_var}.\n"`                      |
|                       |                             | `my_function`                                            |
|                       |                             | `}`                                                      |
| Execute main function | Separator (80 characters)   | `######################################`                 |
|                       | Section Name                | `## Execute`                                             |
|                       | Separator (80 characters)   | `######################################`                 |
|                       | *last code line*            | `main`                                                   |


Template:

```bash
#!/bin/bash
################################################################################
## Template for a simple bash script.
## UBSCSI-420
## BashStd: v0.1
## Info: executed via cron job.
## Usage: execute the script via a cron job.
## KnownBugs: N/A
## ToDo:
## TODO(catalin): add an option for a global variable.
################################################################################
## Global Variables
################################################################################
my_var='String'
################################################################################
## Function(s)
################################################################################
#
# Read multiple option arguments. If an option has multiple inputs, all the inputs are added to an array.
# Globals: args
# Arguments: none
# Outputs: none
# Returns: none
my_function() {
  local my_var='true'
  if [[ ${my_var} == 'true' ]]; then
    printf 'Local variable: my_var.\n'
  fi
}
main() {
  printf "my_var is a ${my_var}.\n"
  my_function
}
################################################################################
## Execute
################################################################################
main
```

---
<a name="linting"></a>
### Linting

It is highly recommended to use [ShellCheck](https://www.shellcheck.net/)[^5].

*This should be implemented in our CI/CD(s).*

---
<a name="indentation"></a>
### Indentation

**Indent two spaces. No tabs!!!**

**No trailing spaces!!!**

Use a comment character ("*`#`*") on an empty line to separate code blocks and improve readability.

Use a comment character ("*`#`*") on two empty lines when you want to separate two sections of code (Eg: separate default variables from functions).

It is recommended to use the [shfmt](https://github.com/mvdan/sh#shfmt)[^6]  tool to maintain consistent formatting.


Example:

```bash
#################################################################################
##! Global variables
#################################################################################
#
# Detect the terminal's line length.
# Default to 61 characters per line displayed to fit in M/Monit / Event details
if [ -t 0 ]; then
  local tty_col=$(tput cols)
fi
local columns=${tty_col:-61}
printf -v line_length "%${columns}s"
#
#
#################################################################################
##! Functions
#################################################################################
#
# Draw separator line(s)
line_equal() { printf '%s\n' "${line_length// /=}"; }
line_dash() { printf '%s\n' "${line_length// /-}"; }
#
# Functions: display info/warning/error messages with a prefix for every line
info() { printf %s "$@" | sed 's/^./INFO: &/'; } # This does not print a newline. Use "\n".
warning() { printf '%s\n' "$@" | sed 's/^./WARNING: &/'; }
error() { printf '%s\n' "$@" | sed 's/^./ERROR: &/' 1>&2; }
```

---
<a name="line-length-and-long-strings"></a>
### Line Length and Long Strings

Although there are no specific recommendations for line length in Bash scripts, keeping lines of code at a reasonable length is generally a good practice to improve readability.

A common convention in many programming languages is to limit line length to 80 characters, but this is not a strict rule and can vary depending on the project.


In case you have a very long string to write which can't be easily split, it is recommended to use *"here document"* or variables.


Example:

```bash
# DO use 'here document's
cat <<END
I am an exceptionally long
string.
END

# Embedded newlines are ok too
local long_string="I am an exceptionally
long string."
```

---
<a name="defining-variables"></a>
### Defining variables

Always use "*`local`*" when setting variables unless there is a reason to use "*`declare`*".

The exception is rare cases when you are intentionally setting a variable in an outer scope.

In this way, you avoid polluting the global namespace and inadvertently setting variables that may have significance outside the function.


When you are forced to define a global variable, try to use "*`read-only`*" unless the string must be changed after declaring the variable ("*`readonly`*" or "*`declare -r`*").


Declaration and assignment should be on different lines.

Variables should always be referred to in the "*`${var}`*" form, as opposed to "*`$var`*".

*See [Variable naming convetion](#variable-naming-convention)*.

---

### Defining functions

Bash can be hard to read and interpret. Using functions can greatly improve readability. Principles from Clean Code apply here.
* Apply the [Simple Responsability Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle)[^7] : a function does one thing.
* Describe the usage of each function: number of arguments, return value, output. *See [Function Comments](#function-comments)*.
* Do not use deprecated style:
    * Define functions as "*`my_function() { ...; }`*". not "*`function my_function { ...; }`*".

---
<a name="pipelines"></a>
### Pipelines

Pipelines should be split one per line if they don't all fit on one line.

If a pipeline all fits on one line, it should be on one line.

If not, it should be split at one pipe segment per line with the pipe on the new line and a 2-space indent for the next section of the pipe. This approach applies to a chain of commands combined using "*`|`*" as well as to logical compounds using "*`||`*" and "*`&&`*".


**Be aware that every command line executed after a pipeline is executed in a sub-shell.**

It means that the exit status code is not easy to catch. See [Bash Variables (Bash Reference Manual) (gnu.org) / #PIPESTATUS](https://www.gnu.org/software/bash/manual/html_node/Bash-Variables.html#index-PIPESTATUS)[^8]


Example:

```bash
# All fits on one line
command1 | command2

# Long commands
command1 \
  | command2 \
  | command3 \
  | command4
```


Example of using "*`PIPESTATUS`*":

```bash
#################################################################################
## Functions
#################################################################################
#
# Function: return "OK!" or "FAIL!" if the command line has zero/non-zero status and write it into the log file.
# - it is checking the return status code from all sub-shells. You do not need to use "set -o pipefail".
# - you can add a custom prefix text:
#   eg: status "Creating backup...";
#   output: Creating backup... OK!
status() {
  if [[ ${PIPESTATUS[@]} =~ [1-9]+ ]]; then
    local unset log_date
    printf '%sFAIL!\n' "${@}" | log
    rm --force -- ${pid}
    #
    # Display the content of the temporary file if it's not empty
    if [[ -s ${tmp_file} ]]; then
      line_dash
      local set log_date=true
      error "$(cat ${tmp_file})\n"
      rm --force -- ${tmp_file} &>>${log}
    fi
    if [[ ${status_continue_on_fail} == true ]]; then
      line_dash
      exit_code=1
      continue
    else
      line_equal
      exit 1
    fi
  else
    local unset log_date
    printf '%sOK!\n' "${@}" | log
  fi
}

[...]

info "Removing the broken backup file: [${db_bkp_file}]..."
rm --force -- "${db_bkp_file}" 2>"${tmp_file}"
status
```


Output:

```bash
Removing the broken backup file: [/opt/bkp/mmonit-2023-04-20.sql.gz]... OK!
```

---
<a name="loops"></a>
### Loops

Put "*`; do`*" and "*`; then`*" on the same line as the "*`while`*", "*`for`*" or "*`if`*".

Loops in shell are slightly different, but we follow the same principles as braces when declaring functions.

That is: "*`; then`*" and "*`; do`*" should be on the same line as the "*`if`/`for`/`while`*". "*`else`*" should be on its line, and closing statements should be vertically aligned with the opening statement.


Example:

```bash
#
# Identify if the given Java processes exist or not
identify_java_process(){
  for jprocess in ${java_process[@]}; do
    if pgrep ${jprocess} &>/dev/null; then
      info "Running Java $(grammar_java_process) found: [${jprocess} / \
        $(pgrep --delimiter ' & ' ${jprocess})].\n"
    else
      error "Java process [${jprocess}] does not exist."
    fi
  done
}
```

---
<a name="case-statement"></a>
### Case Statement

* Indent alternatives by two spaces.
* A one-line alternative needs a space after the close parenthesis of the pattern and before the "*`;;`*".
* Long or multi-command alternatives should be split over multiple lines with the pattern, actions, and "*`;;`*" on separate lines.


The matching expression is indented one level from the "*`case`*" and "*`esac`*".

Multiline actions have indented another level. In general, there is no need to quote match expressions. "Pattern expressions" should not be preceded by an open parenthesis.

Avoid the "*`;&`*" and "*`;;&`*" notations.


Example:

```bash
case "${1}" in
  # Default: true
  -a | --auto)
    # Validate if the option can be used
    # in combination with "--java" option
    if [[ ${java_process[@]} ]]; then
      warning "This option cannot be used with '--java' option!"
    fi
    ;;
    [...]
  -h | --help)
    display_help
    exit 0
    ;;
esac
```

Simple commands may be put on the same line as the pattern and "*`;;`*" as long as the expression remains readable.

This approach is often appropriate for single-letter option processing.

When the actions don't fit on a single line, put the pattern on a line on its own, then the actions, the "*`;;`*" also on a line of its own.

When on the same line as the actions, use a space after the close parenthesis of the pattern and another before the "*`;;`*".


Example:

```bash
case "$1" in
  a) my_var='true' ;;
  f) my_file="${file}" ;;
  v) verbose='true' ;;
  *) error "Unexpected option $1" ;;
esac
```

---
<a name="variable-expansion"></a>
### Variable expansion

Always double-quote your variables. Prefer "*`${var}`*" over "*`$var`*".


Wrong:

```bash
cp $file $destination
```


Correct:

```bash
cp -- "${file}" "${destination}"
```


*This rule can avoid painful mistakes.*

*Imagine that the* "*`file`*" *variable was containing a path with spaces.*

*See [Quoting](#quoting) section.*


* Don't brace-delimit single character shell specials / positional parameters unless strictly necessary or to avoid deep confusion.
* Prefer brace-delimiting all other variables.


Example:

```bash
#
# Preferred style for 'special' variables:
echo "Positional: $1"
echo "Special: $?"
#
# Braces necessary:
echo "many parameters: ${10}"
#
# Braces avoiding confusion:
# Output is "a0b0c0"
set -- a b c;
echo "${1}0${2}0${3}0"
#
# Preferred style for other variables:
echo "PATH=${PATH}, PWD=${PWD}"
```

---
<a name="parameter-expansion"></a>
### Parameter expansion

Always prefer parameter expansion over external command like "*`echo`*", "*`sed`*", "*`awk`*", "*`cut`*", etc.


Wrong:

```bash
name='gigi.sushi'
first_name=$(echo "$name" | cut -d '.' -f 1 )
last_name=$(echo "$name" | cut -d '.' -f 2 )
```


Correct:

```bash
name='gigi.sushi'
first_name=${name/.*}
last_name=${name/*.}
```


*See [BashGuide/Parameters - Greg's Wiki](http://mywiki.wooledge.org/BashGuide/Parameters#Parameter_Expansion)[^9]*

---
<a name="listing-files"></a>
### Listing files

Do not parse "*`ls`*", instead use bash builtin functions to loop files.


Wrong:

```bash
for file in $(ls); do
  [...]
done
```


Correct:

```bash
for file in *; do
  [...]
done
```

*See [ParsingLs - Greg's Wiki](http://mywiki.wooledge.org/ParsingLs)[^10]*

---
<a name="quoting"></a>
### Quoting

* Always quote strings containing variables[^1], command substitutions, spaces or shell meta characters unless the careful unquoted expansion is required or it's a shell-internal integer (*see [Variable expansion](#variable-expansion) and [Quoting](#quoting)*).
* Use arrays for safe quoting of lists of elements, especially command-line flags (*see [Arrays](#arrays) below*).
* Optionally quote shell-internal, read-only special variables that are defined to be integers: "*`$?`*", "*`$#`*", "*`$$`*", "*`$!`*" (man bash). Prefer quoting of "named" internal integer variables, e.g.: PPID, etc for consistency.
* Prefer quoting strings that are "words" (as opposed to command options or path names).
* Never quote *literal* integers.
* Be aware of the quoting rules for pattern matches in "*`[[ ... ]]`*" (*see the [Test, Square Brackets, and double Square Brackets](#test-square-brackets-and-double-square-brackets) section below*).
* Use "*`$@`*" unless you have a specific reason to use "*`$*`*", such as simply appending the arguments to a string in a message or log.
* 'Single' quotes indicate that no substitution is desired.
* "Double" quotes indicate that substitution is required/tolerated.

*What could go wrong if "`$file`" would contain spaces in the filename?! 🙃*


Wrong:
 
```bash
cp $file $destination
```


Correct:
 
```bash
cp -- "${file}" "${destination}"
```


Quote command substitution.

Note that quotes nested inside "*`$()`*" don't need escaping:

```bash
flag="$(some_command and its args "$@" 'quoted separately')"
```


Quote variables:

```bash
# "quote variables"
echo "${flag}"
```


Use arrays with quoted expansion for lists:

```bash
my_function "${my_var[@]}"

```


It's ok to not quote internal integer variables:

```bash
if (( $# > 3 )); then
  echo "ppid=${PPID}"
fi
```


Never quote literal integers:

```bash
# "Never quote literal integers"
value=32
```


Quote command substitutions, even when you expect integers:

```bash
number="$(generate_number)"
```


Prefer quoting words, not compulsory:

```bash
readonly use_boolean='true'
```


Quote shell metacharacters:

```bash
echo 'Hello stranger, and well met. Earn lots of $$$'
echo "Process $$: Done making \$\$\$."
```


Command options or path names.

("*`$1`*" is assumed to contain a value here):

```bash
grep --delimiter --ignore-case Hugo /dev/null "$1"
```


For passing on arguments, "*`$@`*" is right almost every time, and "*`$*`*" is wrong almost every time:
 * "*`$*`*" and "*`$@`*" will split into spaces, clobbering up arguments that contain spaces and dropping empty strings;
 * "*`$@`*" will retain arguments as-is, so no args provided will result in no args being passed on;
 * This is in most cases what you want to use for passing on arguments.
 * "*`$`*" expands to one argument, with all args joined by (usually) spaces, so no args provided will result in one empty string being passed on.

```bash
(set -- 1 "2 two" "3 three tres"; echo $#; set -- "$*"; echo "$#, $@")
(set -- 1 "2 two" "3 three tres"; echo $#; set -- "$@"; echo "$#, $@")
```

---
<a name="beyond-the-guide"></a>
# Beyond the guide

---

The "*`--`*" signals the end of command options and prevents further option processing.

Any arguments after the "*`--`*" are treated as operands, even if they begin with a hyphen.

This approach prevents any arguments that follow from being interpreted as options.

In this case, it contains code/option injection in bash scripts.


Wrong:

```bash
cp -pr file /tmp/
```


Correct:

```bash
cp --preserve --recursive -- "file" "/tmp/"
```

* Always check for syntax errors by running the script with "*`bash -n myscript.sh`*".
* Use [ShellCheck](#shellcheck)[^5] and fix all warnings. This is a static code analyzer that can find a lot of common bugs in the shell scripts. Integrate ShellCheck in your text editor (e.g. Syntastic plugin in Vim).
* Use Bash's debug output feature. This will print each statement after applying all forms of substitution (parameter/command substitution, brace expansion, globbing, etc.):
	* Run the script with "*`bash -x myscript.sh`*"
	* Put "*`set -x`*" at the top of the script.
	* If you only want debut output in a specific section of the script, put "*`set -x`*" before and "*`set +x`* after the section.
* Write lots of log messages to "*`stdout`*" of "*`stderr`*" so it's easier to drill down to what part of the script contains problematic code.


---
<a name="shellcheck"></a>
## ShellCheck

The  [ShellCheck project](https://www.shellcheck.net/)[^5]  identifies common bugs and warnings for your shell scripts. It is recommended for all scripts, large or small.

---
<a name="shfmt"></a>
## SHFMT

[`shfmt`]([GitHub - patrickvane/shfmt: A shell formatter (sh/bash/mksh)](https://github.com/patrickvane/shfmt))[^6] is a shell *formatter*.

It supports POSIX, Bash, and mksh shells and can format shell programs using tabs or any spaces to indent.

You can feed it standard input, any number of files or directories to recurse into.


*Source: [How to Use "shfmt" to Format Shell Scripts Better - How-To Geek.](https://www.howtogeek.com/devops/how-to-use-shfmt-to-format-shell-scripts-better/)[^11]*

---
<a name="command-substitution"></a>
## Command Substitution

**Always use** "*`$(command)`*" **instead of backticks/backquotes!**


Nested backticks require escaping the inner ones with "*`\`*".

The "*`$(command)`*" format doesn't change when nested and is easier to read.


Wrong:

```bash
var="`command \`command1\``"
```


Correct:

```bash
var="$(command "$(command1)")"
```

---
<a name="test-square-brackets-and-double-square-brackets"></a>
## Test, "*`[ ... ]`*", and "*`[[ ... ]]`*"

"*`[[ ... ]]`*" is preferred over "*`[ ... ]`*", test and "*`/usr/bin/[`*".

"*`[[ ... ]]`*" reduces errors as no pathname expansion or word splitting takes place between "*`[[`*" and "*`]]`*".

In addition, "*`[[ ... ]]`*" allows for regular expression matching, while "*`[ ... ]`*" does not.


Example:

```bash
# This ensures the string on the left is made up of characters in
# the alnum character class followed by the string name.
# Note that the RHS should not be quoted here.
if [[ "filename" =~ ^[[:alnum:]]+name ]]; then
  printf 'Match\n'
fi

# This matches the exact pattern "f*" (Does not match in this case)
if [[ "filename" == "f*" ]]; then
  printf 'Match\n'
fi
```

```bash
# This gives a "too many arguments" error as f* is expanded to the
# contents of the current directory
if [ "filename" == f* ]; then
  printf 'Match\n'
fi
```

---
<a name="testing-strings"></a>
## Testing Strings

Use quotes rather than filler characters where possible.

Bash is smart enough to deal with an empty string in a test.

So, given that the code is much easier to read, use tests for empty/non-empty strings or empty strings rather than filler characters.


Wrong:

```bash
if [[ "${my_var}X" == "some_stringX" ]]; then
  my_function
fi
```


Correct:

```bash
# Do this:
if [[ "${my_var}" == "some_string" ]]; then
  my_function
fi

# -z (string length is zero) and -n (string length is not zero) are
# preferred over testing for an empty string
if [[ -z "${my_var}" ]]; then
  my_function
fi

# This is OK (ensure quotes on the empty side), but not preferred:
if [[ "${my_var}" == "" ]]; then
  my_function
fi
```


To avoid confusion about what you're testing for, explicitly use "*`-z`*" or "*`-n`*".


Wrong:

```bash
if [[ "${my_var}" ]]; then
  my_function
fi
```


Correct:

```bash
if [[ -n "${my_var}" ]]; then
  my_function
fi
```


For clarity, use "*`==`*" for equality rather than "*`=`*" even though both work.

The former encourages using "*`[[`*", and the latter can be confused with an assignment.

However, be careful when using "*`<`*" and "*`>`*" in "*`[[ ... ]]`*" which performs a lexicographical comparison.

Use "*`(( ... ))`*" or "*`-lt`*" and "*`-gt`*" for numerical comparison.


Wrong:

```bash
if [[ "${my_var}" = "val" ]]; then
  my_function
fi

# Probably unintended lexicographical comparison.
if [[ "${my_var}" > 3 ]]; then
  # True for 4, false for 22.
  my_function
fi
```


Correct:

```bash
if [[ "${my_var}" == "val" ]]; then
  my_function
fi

if (( my_var > 3 )); then
  my_function
fi

if [[ "${my_var}" -gt 3 ]]; then
  my_function
fi
```

---
<a name="wildcard-expansion-of-filenames"></a>
## Wildcard Expansion of Filenames

Use an explicit path when doing wildcard expansion of filenames.

As filenames can begin with a "*`-`*", it's a lot safer to expand wildcards with "*`./*`*" instead of "*`*`*".


Here are the contents of the directory:

"*`-f  -r  somedir  somefile`*"

Incorrectly deletes almost everything in the directory by force:

```bash
$ rm -v *
removed directory: `somedir'
removed `somefile'
```


As opposed to:

```bash
$ rm --verbose -- ./*
removed `./-f'
removed `./-r'
rm: cannot remove `./somedir': Is a directory
removed `./somefile'
```

---
<a name="eval"></a>
## Eval

"*`eval`*" should be avoided.

Eval munges the input when assigned to variables and can set variables without making it possible to check what those variables were.

```bash
# What does this set?
# Did it succeed? In part or whole?
eval $(set_my_variables)

# What happens if one of the returned values has a space in it?
variable="$(eval some_function)"
```

---
<a name="arrays"></a>
## Arrays

To avoid quoting complications, bash arrays should be used to store lists of elements. This approach particularly applies to argument lists.

Arrays store an ordered collection of strings and can be safely expanded into individual elements for a command or loop.

Using a single string for multiple command arguments should be avoided, as it inevitably leads to authors using "*`eval`*" or trying to nest quotes inside the string, which does not give reliable or readable results and leads to needless complexity.

```bash
# An array is assigned using parentheses and can be appended to
# with +=( ... ).
declare -a flags
flags=(--foo --bar='baz')
flags+=(--greeting="Hello ${name}")
my_binary "${flags[@]}"
```

```bash
# Don't use strings for sequences.
flags='--foo --bar=baz'
flags+=' --greeting="Hello world"'  # This won’t work as intended.
my_binary ${flags}
```

```bash
# Command expansions return single strings, not arrays. Avoid
# unquoted expansion in array assignments because it won’t
# work correctly if the command output contains special
# characters or whitespace.

# This expands the listing output into a string, then does special keyword
# expansion, and then whitespace splitting.  Only then is it turned into a
# list of words.  The ls command may also change behavior based on the user's
# active environment!
declare -a files=($(ls /directory))

# The get_arguments writes everything to STDOUT but then goes through the
# same expansion process above before turning it into a list of arguments.
my_binary $(get_arguments)
```

---
<a name="arrays-pros"></a>
### Arrays Pros

* Using Arrays allows lists of things without confusing quoting semantics. Conversely, not using arrays leads to misguided attempts to nest quoting inside a string.
* Arrays allow safely storing sequences/lists of arbitrary strings, including strings containing whitespace.

---
<a name="arrays-cons"></a>
### Arrays Cons

* Using arrays can risk a script's complexity growing.

---
<a name="arrays-decision"></a>
### Arrays Decision

Arrays should be used to create and pass around lists safely.

In particular, use arrays to avoid confusing quoting issues when building a set of command arguments.

Use quoted expansion *`"${array[@]}"`* to access arrays.

However, if more advanced data manipulation is required, shell scripting should be avoided altogether.

---
<a name="pipes-to-while"></a>
## Pipes to While

Use process substitution or the "*`readarray`*" built-in (bash4+) in preference to piping to "*`while`*".

Pipes create a sub-shell, so any variables modified within a pipeline do not propagate to the parent shell.


The implicit sub-shell in a pipe to "*`while`*" can introduce subtle bugs that are hard to track down.

For example, the exit code from a sub-shell is not propagated to the parent shell. Therefore you need to apply hacks to catch the exit code from a sub-shell (see "*`${PIPESTATUS[@]}`*").

```bash
local last_line='NULL';
command | while read -r line; do
  if [[ -n "${line}" ]]; then
    last_line="${line}"
  fi
done

# This will always output 'NULL'!
echo "${last_line}"
```

Using process substitution also creates a sub-shell.

However, it allows redirecting from a sub-shell to a `while` without putting the `while` (or any other command) in a sub-shell.

```bash
local last_line='NULL';
while read line; do
  if [[ -n "${line}" ]]; then
    last_line="${line}"
  fi
done < <(command)

# This will output the last non-empty line from the command
echo "${last_line}"
```

Alternatively, use the "*`readarray`*" built-in to read the file into an array, then loop over the array's contents.

Notice that (for the same reason as above) you need to use a process substitution with "*`readarray`*" rather than a pipe, but with the advantage that the input generation for the loop is located before it, rather than after.

```bash
local last_line='NULL'
readarray -t lines < <(command)
for line in "${lines[@]}"; do
  if [[ -n "${line}" ]]; then
    last_line="${line}"
  fi
done
echo "${last_line}"
```

> Note: Be cautious using a for-loop to iterate over output, as in "*`for var in $(...)`*", as the output is split by whitespace, not by line. Sometimes you will know this is safe because the output can't contain any unexpected whitespace, but where this isn't obvious or doesn't improve readability (such as a long command inside "*`$(...))`*", a "*`while read`*" loop or "*`readarray`*" is often safer and more transparent.

---
<a name="arithmetic"></a>
## Arithmetic

Always use "*`(( ... ))`*" or "*`$(( ... ))`*" rather than "*`let`*" or "*`$[ ... ]`*" or "*`expr`*" .

Never use the "*`$[ ... ]`*" syntax, the `expr` command, or the "*`let`*" built-in.


"*`<`*" and "*`>`*" don't perform numerical comparison inside "*`[[ ... ]]`*" expressions (they perform lexicographical comparisons instead. *See [Testing Strings](#testing-strings).*

For reference, don't use "*`[[ ... ]]`*" at all for numeric comparisons, use "*`(( ... ))`*" instead.

It is recommended to avoid using "*`(( ... ))`*" as a standalone statement and otherwise be wary of its expression evaluating to zero.


Particularly with "*`set -e`*" enabled. For example, "*`set -e; i=0; (( i++ ))`*" will cause the shell to exit.

```bash
# Simple calculation used as text - note the use of $(( … )) within
# a string.
echo "$(( 2 + 2 )) is 4"

# When performing arithmetic comparisons for testing.
if (( a < b )); then
  …
fi

# Some calculations are assigned to a variable.
(( i = 10 * j + 400 ))
```

```bash
# This form is non-portable and deprecated
i=$[2 * 10]

# Despite appearances, 'let' isn't one of the declarative keywords,
# so unquoted assignments are subject to globbing word splitting.
# For the sake of simplicity, avoid 'let' and use (( ... )).
let i="2 + 2"

# The expr utility is an external program and not a shell built-in.
i=$( expr 4 + 4 )

# Quoting can be error-prone when using expr too.
i=$( expr 4 '*' 4 )
```

Stylistic considerations aside, the shell's built-in arithmetic is many times faster than "*`expr`*".

When using variables, the "*`${var}`*" (and "*`$var`*") forms are not required within "*`$(( ... ))`*".

The shell knows to look up "*`var`*" for you, and omitting the "*`${...}`*" leads to cleaner code.

This contradicts the previous rule about always using braces, so this is a recommendation only.

```bash
# N.B.: Remember to declare your variables as integers when
# possible, and to prefer local variables over globals.
local -i hundred=$(( 10 * 10 ))
declare -i five=$(( 10 / 2 ))

# Increment the variable "i" by three.
# Note that:
#  - We do not write ${i} or $i.
#  - We put a space after the (( and before the )).
(( i += 3 ))

# To decrement the variable "i" by five:
(( i -= 5 ))

# Do some complicated computations.
# Note that normal arithmetic operator precedence is observed.
hr=2
min=5
sec=30
echo $(( hr * 3600 + min * 60 + sec )) # prints 7530 as expected
```

---
<a name="calling-commands"></a>
## Calling Commands

---
<a name="checking-return-values"></a>
### Checking Return Values

Always check return values and give informative return values.

For un-piped commands, use "*`$?`*" or check directly via an "*`if`*" statement to keep it simple.


Example:

```bash
if ! mv -- "${file_list[@]}" "${dest_dir}/"; then
  echo "Unable to move ${file_list[*]} to ${dest_dir}" >&2
  exit 1
fi

# Or
mv "${file_list[@]}" "${dest_dir}/"
if (( $? != 0 )); then
  echo "Unable to move ${file_list[*]} to ${dest_dir}" >&2
  exit 1
fi
```

Alternatively, you can create a function for constantly checking the return value of the last command line executed.


Example:

```bash
################################################################################################
## Global variables
##
## Changes to the default values must be done in maven / "filter.properties".
################################################################################################
#
# Temporary file created in memory.
# Works only with Linux.
tmp_file=$(mktemp /dev/shm/$(basename $0).XXXX)

################################################################################################
## Functions
################################################################################################
#
# Function: return "OK!" or "FAIL!" if the command line has zero/non-zero status and write it into the log file.
# - it is checking the return status code from all sub-shells. You do not need to use "set -o pipefail".
# - you can add a custom prefix text:
#   eg: status "Creating backup...";
#   output: Creating backup... OK!
status() {
  if [[ ${PIPESTATUS[@]} =~ [1-9]+ ]]; then
    local unset log_date
    printf "${@} FAIL!\n" | log
    rm -f -- ${pid}
    #
    # Display the content of the temporary file if it's not empty
    if [[ -s ${tmp_file} ]]; then
      line_dash
      local set log_date=true
      error "$(cat ${tmp_file})\n"
      rm -f -- ${tmp_file} &>>${log}
    fi
    if [[ ${status_continue_on_fail} == true ]]; then
      line_dash
      exit_code=1
      continue
    else
      line_equal
      exit 1
    fi
  else
    local unset log_date
    printf "${@} OK!\n" | log
  fi
}
```

Bash also has the "*`PIPESTATUS`*" variable that allows checking the return code from all pipe parts.

If it's only necessary to check the success or failure of the whole pipe, then the following is acceptable:

```bash
tar -cf - ./* | ( cd "${dir}" && tar -xf - )
if (( PIPESTATUS[0] != 0 || PIPESTATUS[1] != 0 )); then
  echo "Unable to tar files to ${dir}" >&2
fi
```

However, as "*`PIPESTATUS`*" will be overwritten as soon as you do any other command, if you need to act differently on errors based on where it happened in the pipe, you'll need to assign "*`PIPESTATUS`*" to another variable immediately after running the command (don't forget that "*`[`*" is a command and will wipe out "*`PIPESTATUS`*").

```bash
tar --create --file - ./* | ( cd "${dir}" && tar --extract --file - )
return_codes=( "${PIPESTATUS[@]}" )
if (( return_codes[0] != 0 )); then
  my_function
fi
if (( return_codes[1] != 0 )); then
  do_something_else
fi
```

---
<a name="builtin-commands-vs-external-commands"></a>
### Builtin Commands vs External Commands

Given a choice between invoking a shell built-in and invoking a separate process, choose the built-in.

We prefer the use of builtins such as the *Parameter Expansion* functions in "*`bash(1)`*" as it's more robust and portable (especially when compared to things like "*`sed`*").


Wrong:

```bash
addition="$(expr "${x}" + "${y}")"
substitution="$(echo "${string}" | sed -e 's/^foo/bar/')"
```


Correct:

```bash
addition=$(( x + y ))
substitution="${string/#foo/bar}"
```

---
<a name="extended-printing-echo"></a>
## Extended Printing (echo)

People often want to print a string but omit the trailing new line.

Or print a string with escape sequences (like colors or tabs).

It would be best to never use "*`echo`*" for this. Instead, use "*`printf`*".
*See [echo and printf behaviour](https://www.in-ulm.de/~mascheck/various/echo+printf/)[^12]*

In other words, when you use "*`echo`*", avoid all options like "*`-e`*" or "*`-n`*".

The "*`printf`*" command is both powerful & portable and has well-defined behavior in all shell environments.

```bash

# Print out a string without a trailing newline.
printf '%s' "${some_var}"

# Print out a string and interpret the escape sequences it contains.
printf '%b\n' "${some_var}"

# Print escape sequences in place.
printf '\tblah: run it and believe\n'
```

---
<a name="default-assignments"></a>
## Default Assignments


Sometimes you want to set a variable to something if it isn't already selected.


People will try to test for this case using the "*`-z`*" operator ("*`[[ -z ${foo} ]]`*").

This approach leads to duplicated/multiline code when all can be accomplished in one line.

It might also not be correct if you want to accept an empty string as a valid input.

```bash
# Assign "bar" to the variable "foo" if it is not set, or if it is set to "".
: "${foo:=bar}"

# Assign "bar" to the variable "foo" only if it is not set.
# If "bar" is already set to "", do nothing.
: "${foo=bar}"
```


---
<a name="argument-option-parsing"></a>
## Argument/Option Parsing

Often you want your script to accept flags like "*`--foo`*" or "*`-q`*". There are three options depending on how many flags parsing you need to do:

1.  Parse the arguments yourself and scan for options
    -   Should be avoided for anything beyond one or two simple flags
2.  Use the [getopts](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/getopts.html)[^13], built-in helper
    -   Preferred when you only have short options (e.g. "*`-q`*" and "*`-v`*" and "*`-h`*" vs "*`--quiet`*" and "*`--version`*" and "*`--help`*")
    -   You have to implement the help (usage) flag yourself
3.  Use the [shflags](https://code.google.com/p/shflags/wiki/Documentation10x)[^14] package
    -   Already shipped in the SDK and inboard images
    -   Provides clean API for supporting short and long options
    -   Automatic support for help output

There is a getopt program that is provided by the "*util-linux*" package, but it should be avoided.

Short options don't provide any advantage over getopts, and long options don't offer the level of functionality that "*`shflags`*" do.

---
<a name="getopts"></a>
### [getopts](https://chromium.googlesource.com/chromiumos/docs/+/master/styleguide/shell.md#getopts)

Here is an example of using getopts.

Note the number of things required to be implemented by you.

```bash
#!/bin/sh

die() {
  echo "${0##*/}: error: $*" >&2
  exit 1
}

usage() {
  echo "Usage: foo [options] [args]

This does something useful!

Options:
  -o <file>   Write output to <file>
  -v          Run verbosely
  -h          This help screen"
  exit 0
}

main() {
  local flag
  local verbose="false"
  local out="/dev/stdout"

  while getopts 'ho:v' flag; do
    case ${flag} in
      h) usage ;;
      o) out="${OPTARG}" ;;
      v) verbose="true" ;;
      *) die "invalid option found" ;;
    esac
  done

  if [[ ${verbose} == "true" ]]; then
    echo "verbose mode is enabled!"
  else
    echo "will be quiet"
  fi

  if [[ -z ${out} ]]; then
    die "-o flag is missing"
  fi
  echo "writing output to: '${out}'"

  # Now remaining arguments are in "$@".
  ...
}
main "$@"
```

*See *[getopts](https://chromium.googlesource.com/chromiumos/docs/+/master/styleguide/shell.md#getopts)[^13]

---
<a name="shflags"></a>
### [shflags](https://chromium.googlesource.com/chromiumos/docs/+/master/styleguide/shell.md#shflags)

Here is an example of using "*`shflags`*".

Options are declared & processed up top, but then the layout is like usual.

```bash
#!/bin/sh

# This is the path in the SDK and in CrOS boards.
. /usr/share/misc/shflags

define_string out '/dev/stdin' 'Write output to this file' 'o'
define_boolean verbose ${flags_false} 'Enable verbose output' 'v'

flags_help='Usage: foo [options] [args]

This does something useful!
'

# Parse command line.
flags "$@" || exit 1
eval set -- "${flags_argv}"

# Only after this point should you enable `set -e` as
# shflags does not work when that is turned on first.
set -e

die() {
  echo "${0##*/}: error: $*" >&2
  exit 1
}

main() {
  if [[ ${flags_verbose} -eq ${flags_true} ]]; then
    echo "verbose mode is enabled!"
  else
    echo "will be quiet"
  fi

  if [[ -z ${flags_out} ]]; then
    die "--out flag is missing"
  fi
  echo "writing output to: '${flags_out}'"

  # Now remaining arguments are in "$@".
  ...
}
main "$@"
```

*See [shflags](https://chromium.googlesource.com/chromiumos/docs/+/master/styleguide/shell.md#shflags)[^14]*

---
<a name="conclusion"></a>
## Conclusion

Use common sense and *BE CONSISTENT*.

---
<a name="footnote"></a>
# Footnote

* [^1]: [Quotes - Greg's Wiki](http://mywiki.wooledge.org/Quotes)
* [^2]: [How "Exit Traps" Can Make Your Bash Scripts Way More Robust And Reliable](http://redsymbol.net/articles/bash-exit-traps/)
* [^3]: [Naming convention (programming) - Wikipedia](https://en.wikipedia.org/wiki/Naming_convention_(programming))
* [^4]: [The Open Group Base Specifications Issue 7, 2018 edition](https://pubs.opengroup.org/onlinepubs/9699919799/)
* [^5]: [ShellCheck – shell script analysis tool](https://www.shellcheck.net/)
* [^6]: [How to Use "shfmt" to Format Shell Scripts Better - How-To Geek.](#https://www.howtogeek.com/devops/how-to-use-shfmt-to-format-shell-scripts-better/)
* [^7]: [Simple Responsability Principle](https://en.wikipedia.org/wiki/Single_responsibility_principle)
* [^8]: [Bash Variables (Bash Reference Manual) (gnu.org)](https://www.gnu.org/software/bash/manual/html_node/Bash-Variables.html#index-PIPESTATUS)
* [^9]: [BashGuide/Parameters - Greg's Wiki](http://mywiki.wooledge.org/BashGuide/Parameters#Parameter_Expansion)
* [^10]: [ParsingLs - Greg's Wiki](http://mywiki.wooledge.org/ParsingLs)
* [^11]: [How to Use "shfmt" to Format Shell Scripts Better - How-To Geek.](https://www.howtogeek.com/devops/how-to-use-shfmt-to-format-shell-scripts-better/)
* [^12]: [echo and printf behaviour](https://www.in-ulm.de/~mascheck/various/echo+printf/)
* [^13]: [getopts](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/getopts.html)
* [^14]: [shflags](https://code.google.com/p/shflags/wiki/Documentation10x)


---
<a name="glossary"></a>
# Glossary

* [Advanced Bash-Scripting Guide](https://tldp.org/LDP/abs/html/)
* [styleguide | Style guides for Google-originated open-source projects](https://google.github.io/styleguide/shellguide.html)
* [GitHub - mvdan/sh: A shell parser, formatter, and interpreter with bash support; includes shfmt](https://github.com/mvdan/sh#shfmt)
* [A guide to common variable naming conventions | TheServerSide](https://www.theserverside.com/feature/A-guide-to-common-variable-naming-conventions)
* [ShellCheck – shell script analysis tool](https://www.shellcheck.net/)
* [explainshell.com - match command-line arguments to their help text](https://explainshell.com/)
* [Markdown Guide](https://www.markdownguide.org/)
* [Shell scripting standards and style guidelines | GitLab](https://docs.gitlab.com/ee/development/shell_scripting_guide/)
* [Chromium OS Docs - Shell Style Guidelines go/cros-shstyle](https://chromium.googlesource.com/chromiumos/docs/+/master/styleguide/shell.md)
* https://developer.apple.com/library/archive/documentation/OpenSource/Conceptual/ShellScripting/Introduction/Introduction.html
* https://lug.fh-swf.de/vim/vim-bash/StyleGuideShell.en.pdf
* [Quickstart with BashSupport Pro, the Bash IDE – BashSupport Pro](https://www.bashsupport.com/manual/quick-start/)
* [CSE 374 Bash Style Guide](https://courses.cs.washington.edu/courses/cse374/19sp/bash_style_guide.html)
* [GitHub - bahamas10/bash-style-guide: A style guide for writing safe, predictable, and portable bash scripts (not sh!)](https://github.com/bahamas10/bash-style-guide)
* [GitHub - progrium/bashstyle: Let's do Bash right!](https://github.com/progrium/bashstyle)
* [How to Use "shfmt" to Format Shell Scripts Better - How-To Geek.](https://www.howtogeek.com/devops/how-to-use-shfmt-to-format-shell-scripts-better/)
* [BashFAQ/031 - Greg's Wiki](http://mywiki.wooledge.org/BashFAQ/031)
* [echo and printf behaviour](https://www.in-ulm.de/~mascheck/various/echo+printf/)
* [The Open Group Base Specifications Issue 7, 2018 edition](https://pubs.opengroup.org/onlinepubs/9699919799/)
* [BASH3 Boilerplate - Template for writing better Bash scripts](https://bash3boilerplate.sh/)
* [The Twelve-Factor App](https://12factor.net/)
* [Best Practices for Writing Bash Scripts | by Mohit Sharma | FAUN Publication](https://faun.pub/best-practices-for-writing-bash-scripts-b72fe4099b0)
* [Bash best practices | cheat-sheets](https://bertvv.github.io/cheat-sheets/Bash.html)
* [BashGuide/Parameters - Greg's Wiki](http://mywiki.wooledge.org/BashGuide/Parameters#Parameter_Expansion)
* [ParsingLs - Greg's Wiki](http://mywiki.wooledge.org/ParsingLs)
* [dylanaraps/pure-bash-bible: 📖 A collection of pure bash alternatives to external processes.](https://github.com/dylanaraps/pure-bash-bible)
* [Good practices for writing shell scripts | Yoann Bentz <Yoone.eu>](https://yoone.eu/article/good-practices-for-writing-shell-scripts/)
* *FUN*: [Command Challenge!](https://cmdchallenge.com/)
* [Autoconf / #Portable-Shell](https://www.gnu.org/savannah-checkouts/gnu/autoconf/manual/autoconf-2.71/autoconf.html#Portable-Shell)
* [Anybody can write good bash (with a little effort)](https://blog.yossarian.net/2020/01/23/Anybody-can-write-good-bash-with-a-little-effort)
* [bash keyboard shortcuts - Linux - SS64.com](https://ss64.com/bash/syntax-keyboard.html)
* [Shell Scripts Matter - DEV Community](https://dev.to/thiht/shell-scripts-matter)
* [201102 - apenwarr](https://apenwarr.ca/log/?m=201102#28)
* [Bash Strict Mode](http://redsymbol.net/articles/unofficial-bash-strict-mode/)
* [Archived | Evolution of shells in Linux - IBM Developer](https://developer.ibm.com/tutorials/l-linux-shells/)
* [BashPitfalls - Greg's Wiki](https://mywiki.wooledge.org/BashPitfalls)
* [BashFAQ - Greg's Wiki](https://mywiki.wooledge.org/BashFAQ)
* [BashGuide - Greg's Wiki](http://mywiki.wooledge.org/BashGuide)
* [Linux Bash Shell Scripting Tutorial Wiki](https://bash.cyberciti.biz/guide/Main_Page)
* [Bash Reference Manual](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html)
* [bash(1): GNU Bourne-Again SHell - Linux man page](https://linux.die.net/man/1/bash)
* [Common shell script mistakes](http://www.pixelbeat.org/programming/shell_script_mistakes.html)
* [The Bash Guide](https://guide.bash.academy/)
* [Bash shell-scripting librarie](https://dberkholz.com/2011/04/07/bash-shell-scripting-libraries/)

---
<a name="todo"></a>
# ToDo

* TODO(catalin): *re-organize chapters*

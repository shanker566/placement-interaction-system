@REM ----------------------------------------------------------------------------
@REM Maven Wrapper startup batch script, version 3.2.0
@REM
@REM Required ENV vars:
@REM JAVA_HOME - location of a JDK home dir
@REM
@REM Optional ENV vars
@REM MAVEN_BATCH_ECHO - set to 'on' to enable the echoing of the batch commands
@REM MAVEN_BATCH_PAUSE - set to 'on' to wait for a keystroke before ending
@REM MAVEN_OPTS - parameters passed to the Java VM when running Maven
@REM     e.g. to debug Maven itself, use
@REM set MAVEN_OPTS=-Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=y,address=8000
@REM MAVEN_SKIP_RC - flag to disable loading of mavenrc files
@REM ----------------------------------------------------------------------------

@IF "%MAVEN_BATCH_ECHO%"=="on" echo %MAVEN_BATCH_ECHO%

@REM Set %HOME% to equivalent of $HOME
@IF "%HOME%"=="" (SET "HOME=%HOMEDRIVE%%HOMEPATH%")

@IF "%MAVEN_SKIP_RC%"=="" (
  @IF EXIST "%HOME%\mavenrc_pre.bat" CALL "%HOME%\mavenrc_pre.bat"
)

@setlocal

@SET MAVEN_PROJECTBASEDIR=.
@cd /d "%~dp0"

@SET WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain

@SET DOWNLOAD_URL=https://repo.maven.apache.org/maven2/org/apache/maven/wrapper/maven-wrapper/3.2.0/maven-wrapper-3.2.0.jar

@FOR /F "usebackq tokens=1,2 delims==" %%A IN (".mvn\wrapper\maven-wrapper.properties") DO (
    @IF "%%A"=="wrapperUrl" SET DOWNLOAD_URL=%%B
)

@SET WRAPPER_JAR="%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar"
@SET WRAPPER_LAUNCHER=org.apache.maven.wrapper.MavenWrapperMain

@IF EXIST %WRAPPER_JAR% (
    @REM Wrapper jar already exists, skip download
) ELSE (
    @echo Downloading Maven Wrapper...
    @IF "%JAVA_HOME%"=="" (
        @java -Dmaven.multiModuleProjectDirectory="%MAVEN_PROJECTBASEDIR:~0,-1%" ^
           -Dmaven.wrapper.launcher.prepare=true ^
           -Djava.security.manager=allow ^
           -classpath "%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar" ^
           "%WRAPPER_LAUNCHER%" %MAVEN_CONFIG% %* || (
            @powershell -Command "(New-Object System.Net.WebClient).DownloadFile('%DOWNLOAD_URL%', '.mvn\wrapper\maven-wrapper.jar')"
           )
    ) ELSE (
        @"%JAVA_HOME%\bin\java" -Dmaven.multiModuleProjectDirectory="%MAVEN_PROJECTBASEDIR:~0,-1%" ^
           -Djava.security.manager=allow ^
           -classpath "%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar" ^
           "%WRAPPER_LAUNCHER%" %MAVEN_CONFIG% %* || (
            @powershell -Command "(New-Object System.Net.WebClient).DownloadFile('%DOWNLOAD_URL%', '.mvn\wrapper\maven-wrapper.jar')"
           )
    )
    @IF NOT EXIST %WRAPPER_JAR% (
        @powershell -Command "(New-Object System.Net.WebClient).DownloadFile('%DOWNLOAD_URL%', '.mvn\wrapper\maven-wrapper.jar')"
    )
)

@SET DOWNLOAD_URL=https://repo.maven.apache.org/maven2/org/apache/maven/apache-maven/3.9.6/apache-maven-3.9.6-bin.zip

@IF "%JAVA_HOME%"=="" (
    @set _JAVACMD=java
) ELSE (
    @set _JAVACMD="%JAVA_HOME%\bin\java"
)

@SET MAVEN_OPTS=%MAVEN_OPTS% -Dmaven.multiModuleProjectDirectory="%MAVEN_PROJECTBASEDIR%"

@%_JAVACMD% %MAVEN_OPTS% ^
  -classpath "%MAVEN_PROJECTBASEDIR%\.mvn\wrapper\maven-wrapper.jar" ^
  "-Dmaven.multiModuleProjectDirectory=%MAVEN_PROJECTBASEDIR:~0,-1%" ^
  %WRAPPER_LAUNCHER% %MAVEN_CONFIG% %*

@IF "%MAVEN_BATCH_PAUSE%"=="on" PAUSE

@IF "%MAVEN_SKIP_RC%"=="" (
  @IF EXIST "%HOME%\mavenrc_post.bat" CALL "%HOME%\mavenrc_post.bat"
)

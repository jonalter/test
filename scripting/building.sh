##
# Use this script in one of several ways:
# To launch the Android package manager, ./t a
# To deploy to Android ./t /Code/PathToYourProject da
# To run the iOS Simulator ./t /Code/PathToYourProject si
# To run the Android Emulator ./t /Code/PathToYourProject sa
# Future feature: add support for deploying to iOS with the "di" flag
##

##
# Variables you need to customize
##
titaniumsdk="1.7.0"
androidsdk="/Library/androidsdk"
androidapi="APIs 2.2"
androidresolution="HVGA"
iphone="4.2"

##
# 2 passed in arguments means launch simulator or deploy; otherwise, show android package manager
##
if [ $# = 2 ]
then
    ##
    # Find out the ID and name of your project from tiapp.xml
    ##
    path="$1"
    id=`grep '<id>.*</id>' $path/tiapp.xml | cut -d '<' -f 2 | cut -d '>' -f 2`
    name=`grep '<name>.*</name>' $path/tiapp.xml | cut -d '<' -f 2 | cut -d '>' -f 2`
    if [ $2 = "sa" ]
    then
        /Library/Application\ Support/Titanium/mobilesdk/osx/$titaniumsdk/android/builder.py "simulator" "$name" "$androidsdk" "$path" "$id" "$androidapi" "$androidresolution"
        adb -e logcat -c
	adb -e logcat
    else
        if [ $2 = "si" ]
        then
            /Library/Application\ Support/Titanium/mobilesdk/osx/$titaniumsdk/iphone/builder.py "simulator" "$iphone" "$path" "$id" "$name" "iphone"
        else
            if [ $2 = "da" ]
            then
                /Library/Application\ Support/Titanium/mobilesdk/osx/$titaniumsdk/android/builder.py "install" "$name" "$androidsdk" "$path" "$id" "7"
            else
                # TODO: deploy iPhone...
                echo "Deploy to iPhone is not supported yet!"
            fi
        fi
    fi
else
    if [ $# = 1 ]
    then
        if [ $1 = "a" ]
        then
            $androidsdk/tools/android &
        else
            echo "Command not understood!"
        fi
    else
        echo "Command not understood!"
    fi
fi
(google-chrome --disable-infobars --disable-session-crashed-bubble --kiosk file:///home/$USER/grandPC/runOnBoot.html)&
(while true; do
	if [ -f /home/$USER/Downloads/turnoff.txt ]; then
		rm /home/$USER/Downloads/turnoff.txt
		echo $(cat /home/$USER/pwd) | sudo -S sync
		echo $(cat /home/$USER/pwd) | sudo -S poweroff
	fi
	sleep 5;
done;)&

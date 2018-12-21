for (( i = 0; i < 137; i++ )); do
	num1=`expr $num2 + 200`
	if [[ $num2 ]]; then
		num3=`expr $num2 + 1`
		node scrapingController.js $num3 $num1
	fi
	num2=`expr $i \* 200`
done
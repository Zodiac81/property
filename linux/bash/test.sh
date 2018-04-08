#/bish/bash

# declare -a array_val
# declare -A array_val
array_val=($(ls))

for index in ${!array_val[*]}
do
    # printf "%4d: %s\n" $index ${array_val[$index]}
    # echo $index
done

echo -n "Dell images? (N/y) "
read item
case "$item" in
	y) echo -n "Key: "
		while true
		do
			read key
			if [[ ! -z "$key" ]]; then
				rm -rf ./${array_val[$key]}
				ls -al
    			break
			fi
		done;;
    *) echo "Exit";;
esac
shift
echo "Finish"
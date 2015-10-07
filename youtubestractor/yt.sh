#!/usr/bin/bash

# Backup field separator
OLDIFS=$IFS;
IFS='
';

# obtain parameters for construction of video URLs
#
# get Youtube page source code
#    wget -q -O - "$1"
# find parameter containing video URLs
#    grep "videoplayback"
# replace ", " with newline so we can find encoded URLs
#    sed 's/","/"\n"/g'
# find encoded URLs
#    grep "url_encoded_fmt_stream_map"
# cut off parameter name, e.g. "url_encoded_fmt_stream_map"
# remove "
# replace "," with newline so we can filter for parameters
# replace unicode character \u0026 with newline to separate parameters
#    sed 's/\".*\"://g; s/\"//g; s/,/\n/g; s/\\u0026/\n/g'
# filter for parameters of interest
#    grep -E "quality|url|sig|s="
# decode html encoded characters
#    echo -e $(sed 's/%/\\x/g')
# separate parameters of interest
# prepare "sig" parameter for video URL
#    sed 's/ /\n/g'
#    sed 's/^s\=/\&signature\=/g'
videos=($(wget -q -O - "$1" |\
          grep "videoplayback" |\
          sed 's/","/"\n"/g' |\ 
          grep "url_encoded_fmt_stream_map" |\
          sed 's/\".*\"://g; s/\"//g; s/,/\n/g; s/\\u0026/\n/g' |\
          grep -E "quality|url|sig|s=" |\
          echo -e $(sed 's/%/\\x/g') |\
          sed 's/ /\n/g' | sed 's/^s\=/\&signature\=/g'));

# variables to store parameters
quali=();
urls=();
sigs=();

# sort parameters
for i in ${videos[@]}; do
	if [ "${i:0:3}" == "qua" ]; then
		quali=("${quali[@]}" "$i");
	elif [ "${i:0:3}" == "url" ]; then
		urls=("${urls[@]}" "$i");
	elif [ "${i:0:3}" == "&si" ]; then
		sigs=("${sigs[@]}" "$i");
	fi;
done;

# construct video URL and output information
for (( i=0; i<${#urls[@]}; i++ )); do	 	 
	# video index	 	 
	echo "Video $i";	 	 
	echo "=======";	 	 

	# video quality	 	 
	echo "${quali[$i]}" | sed 's/=/: /g';	 	 

	# video URL	 	 
	url="${urls[$i]:4}${sigs[$i]}";	 	 

	# if ffprobe is installed, show video and audio stream information	 	 
	if [ ! -z $(which ffprobe 2>/dev/null) ]; then
		streams=($(ffprobe "$url" 2>&1 | grep -i stream));
		for s in ${streams[@]}; do
			echo ${s#*: };
		done;
	fi;
	# print video URL
	echo "url: \"$url\"";
	echo;
done;

# restore field separator
IFS=$OLDIFS;
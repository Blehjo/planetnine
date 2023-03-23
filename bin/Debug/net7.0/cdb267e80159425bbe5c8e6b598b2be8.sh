function list_child_processes () {
    local ppid=$1;
    local current_children=$(pgrep -P $ppid);
    local local_child;
    if [ $? -eq 0 ];
    then
        for current_child in $current_children
        do
          local_child=$current_child;
          list_child_processes $local_child;
          echo $local_child;
        done;
    else
      return 0;
    fi;
}

ps 70341;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 70341 > /dev/null;
done;

for child in $(list_child_processes 70457);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/blehjo/projects/planetnine/planetnine/bin/Debug/net7.0/cdb267e80159425bbe5c8e6b598b2be8.sh;

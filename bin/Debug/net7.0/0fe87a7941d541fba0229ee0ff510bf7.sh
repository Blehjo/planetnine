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

ps 13788;
while [ $? -eq 0 ];
do
  sleep 1;
  ps 13788 > /dev/null;
done;

for child in $(list_child_processes 13812);
do
  echo killing $child;
  kill -s KILL $child;
done;
rm /Users/blehjo/projects/planetninesolution/planetnine/bin/Debug/net7.0/0fe87a7941d541fba0229ee0ff510bf7.sh;

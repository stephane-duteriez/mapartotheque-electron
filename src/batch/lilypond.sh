cd ~
echo "starting"
MAPARTOTHEQUE_DIR=~/.mapartotheque
if [ -d "$MAPARTOTHEQUE_DIR" ]
then
	echo "$MAPARTOTHEQUE_DIR already exists"
else 
	echo "Creating $MAPARTOTHEQUE_DIR"
	mkdir $MAPARTOTHEQUE_DIR
fi
cd $MAPARTOTHEQUE_DIR
ls -l
echo "Generating PDF"
lilypond $@
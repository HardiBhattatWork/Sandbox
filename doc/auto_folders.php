<?php 
$file_dir="content"; //change this to a folder name
$main_title="Media Gallery";
$show_titles=true; //change to false if you don't want to see the captions
$omit_file_chars=3; //how many characters to cut off the file title's front
$omit_folder_chars=3; //how many characters to cut off the folder title's front
$omit_image_chars=3; //how many characters to cut off the image title's front
$show_links=true; //do you want to display links?
$before_link=""; // string to add before link text
$after_link=""; // string to add after link text
$styles_file="styles.txt"; //location of the styles text file
$exclude_files = array(
"excluded folder"
);
$swf_loc="";
function getVideoPath($videofile, $swf){
if($swf=="") return $videofile;
	global $file_dir, $swf_loc;
	$foundDiscresion=false;
	$slasher = "";
	$videoArr = explode("/", $videofile);
	$swfArr = explode("/", $swf);
	$arlenth = count($videoArr);
	for($i=0; $i<$arlenth; $i++){
		if($videoArr[$i] != $swfArr[$i] && !$foundDiscresion){
			$foundDiscresion = true;
			$vr = "";
			$sr = "";
		}
		if($foundDiscresion){
			$vr .= $videoArr[$i]."/";
			if($swfArr[$i]) $slasher .= "../";			
		}
	}
	return $slasher.substr($vr, 0, -1);
	$videostr = $vr[0];
	for($k=1; $k<count($vr)-1; $k++){
		$videostr .= "/".$vr[$k];
	}
	return $videostr;
}




function filearray($start) {
global $exclude_files;
  $dir=opendir($start);
  while (false !== ($found=readdir($dir))) { $getit[]=$found; }
  foreach($getit as $num => $item) {
   if (is_dir($start.$item) && $item!="." && $item!=".." && array_search($item, $exclude_files)===false) { $output["{$item}"]=filearray($start.$item."/"); }
   if (is_file($start.$item) && array_search($item, $exclude_files)===false) { $output["{$item}"]=$start.$item; }
  }
  closedir($dir);
 ksort($output);
  return $output;
}
$ff = filearray($file_dir."/");
//print_r($ff);

function printXML($arr){
global $show_titles, $omit_file_chars, $omit_folder_chars, $show_links, $before_link, $after_link, $swf_loc, $exclude_files, $omit_image_chars;
	foreach($arr as $key => $val) {
		if(is_array($val)){
		$folder_title=substr($key, $omit_folder_chars);
		print "<folder name=\"$folder_title\">";
		ksort($val);
			 printXML($val);
		print "</folder>";
		}else{
		$file = $val;
			if(strtolower(substr($file, -3)) == "jpg" || strtolower(substr($file, -4)) == "jpeg" ){
				$tmp_str = '<pic image="'.$file.'" ';
					if($show_titles){
						$file_title=substr($key, $omit_image_chars, strpos($key, ".")-$omit_image_chars);
						$tmp_str .= 'title="'.$file_title.'" ';
					}
					if($show_links){
						$link_title=substr($file, $omit_image_chars, strpos($file, ".")-$omit_image_chars);
						$tmp_str .= 'link="'.$file.'" ';
						$tmp_str .= 'link_title="'.$before_link.$file.$after_link.'"';
					}
					$tmp_str .=" />";
					print $tmp_str;
					print "\n";
				}
				elseif(substr($file, -3) == "mp3"){
					$file_title=substr($key, $omit_file_chars, strpos($key, ".")-$omit_file_chars);
					print '<music file="'.$file.'" name="'.$file_title.'" />';
				}
				elseif(substr($file, -3) == "flv"){
					$flv_loc = getVideoPath($file, $swf_loc);
					$file_title=substr($key, $omit_file_chars, strpos($key, ".")-$omit_file_chars);
					print '<video file="'.$flv_loc.'" name="'.$file_title.'" />';
				}
				elseif(substr($file, -3) == "txt"){
					$file_title=substr($key, $omit_file_chars, strpos($key, ".")-$omit_file_chars);
					print '<txt file="'.$file.'" name="'.$file_title.'" />';
				}
				elseif(substr($file, -3) == "xml"){
					$fxml = fopen($file, 'r');
					$xmltxt = "";
					while(!feof($fxml)){
						$xmltxt .= fread($fxml, 999999);
					}
					print $xmltxt;
					fclose($fxml); 
				}
				elseif(substr($file, -3) == "swf"){
					$file_title=substr($key, $omit_file_chars, strpos($key, ".")-$omit_file_chars);
					print '<swf file="'.$file.'" name="'.$file_title.'" />';
				}
		}
	}
}
header("content-type:text/xml;charset=utf-8");
print '<?xml version="1.0" encoding="iso-8859-1"?>';
print '<folder name="'.$main_title.'" ';
include($styles_file);
print '>';
printXML($ff);
print "</folder>";
?>

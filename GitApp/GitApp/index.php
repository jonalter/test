<?php
	include_once('Git.php');
	include_once('Config.php');
	include_once('Filefunctions.php');
	
	define("DIR", dirname(__FILE__));
	$repo_path = DIR.Config::repo;
	$source = Config::source;
	$status_message = "Add a code sample to github"; 
?>
<?php
	
	// check if repo exists
	if( is_dir($repo_path) ){
		// open local repo
		$repo = Git::open($repo_path);
	}else{
		// clone remote repo
		$repo = new GitRepo($repo_path, true, false);
		$repo->clone_remote($source);
	}
	
	// pull from origin
	// $repo->run('pull');
	
	// $folders = $_POST['folders'];
	// if(count($folders) != 0){
	// 	for($i=0;$i<count($folders);$i++){
	// 		echo("$folders[$i]/");
	// 	}
	// }
	
	

	if( !empty($_POST['file_title']) ){
		
		$f_main_cat = trim( $_POST['main_cat'] );
		$f_sub_cat = trim( $_POST['sub_cat'] );
		$f_folder = trim( $_POST['file_folder'] );
		$folders = $_POST['folders'];
		
		$f_title = trim( $_POST['file_title'] );
		$f_desc = trim( $_POST['file_description'] );
		$f_tags = trim( $_POST['file_tags'] );
		$f_code = trim( $_POST['file_code'] );
		
		// TITLE
		// if title not end in .js make it end in .js
		// if( !preg_match('/.js$/',$f_title) ){
		// 	$f_title = $f_title.".js";
		// }
	
		// pull from origin
		$repo->run('pull');
		
		// create path to file
		$file_path = $repo_path;
		
		if(count($folders) != 0){
			for($i=0;$i<count($folders);$i++){
				$file_path = $file_path."/".$folders[$i];
			}
		}
		
		// THIS IS NOT WORKING
		// by this i mean the creating a folder 
		$file_path = $file_path."/".$f_folder;
		echo($file_path);
		// echo("[$f_folder]");
		
		// If folder or file already exits warn and stop
		$fileName = $file_path."/".$f_title;
		if(  is_dir($file_path) && !empty($f_folder) ){
			$status_message = 'Pick another folder name, a folder with the name \''
					.$file_path."/"
					.'\' already exists.';
		}else{
			$file_path = $file_path."/".$file_folder;
			if( !empty($f_folder) ){
				if( !mkdir($file_path) ){
					$status_message = 'Error making directory: $f_folder';
				}
			}
			
			if( file_exists($fileName) ){
				$status_message = 'Pick another file name, a file with the name \''
						.$file_path
						.$f_title.'\' already exists.';	
			}else{
				if( !($file = fopen($fileName,'w')) ){
					$status_message = "Error creating file: ".$fileName;
				}

				// DESCRIPTION
				// comment description
				$f_desc = "// Description \n// ".$f_desc;

				// TAGS
				// add # to tags if they don't already have them
				$tag_array = explode(" ", $f_tags);
				$f_tags = "// Tags \n// ";
				foreach( $tag_array as $tag ){
					if( !preg_match('/^\#/', $tag) ){
						$tag = '#'.$tag;
					}
					$f_tags = $f_tags.$tag." ";
				}
				try{
				fwrite($file,$f_desc."\n\n");
				fwrite($file,$f_tags."\n\n");
				fwrite($file,$f_code."\n");
				fclose($file);
				}catch (Exception $e) {
					$status_message = "Error writing to file: ".$f_title;
				}
				try{
					// `git add *`
					$repo->add('*');
					// `git commit -av -m 'added files'`
					$commit_message = "added ".$f_title;
					$repo->commit($commit_message);
					// push out
	//				$repo->run('push origin master');

					$status_message = 'Successfully created file: '.$f_title;
				}catch (Exception $e) {
					$status_message = 'Error pushing to GitHub';
				}

				// Unset all POST params
				unset($_POST['file_folder']);
				unset($_POST['file_title']);
				unset($_POST['file_description']);
				unset($_POST['file_tags']);
				unset($_POST['file_code']);
				unset($_POST['main_cat']);
				unset($_POST['sub_cat']);
			}
		}
	}
?>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<title>index</title>
	<link rel="stylesheet" type="text/css" href="index.css">
	<!-- include jQuery libraries -->
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js"></script>
    <script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.7.3/jquery-ui.min.js"></script>

    <!-- include checkboxTree plugin -->
    <link rel="stylesheet" type="text/css" href="checkboxtree-0.4.3/jquery.checkboxtree.min.css">
    <script type="text/javascript" src="checkboxtree-0.4.3/jquery.checkboxtree.min.js"></script>

    <!-- initialize checkboxTree plugin -->
    <script type="text/javascript">
    //<!--
        $(document).ready(function() {
             $('#folder_tree').checkboxTree({
 				onCheck: {
 				    ancestors: 'check', //or '', 'uncheck'
 				    descendants: '', //or '', 'uncheck'
 				    node: '' // or 'collapse', 'expand'
 				},
 				onUncheck: {
 				    ancestors: '', //or 'check', 'uncheck'
 				    descendants: 'uncheck', //or '', 'check'
 				    node: '' // or 'collapse', 'expand'
 				},
 				checkChildren: false,
 				collapseImage: 'images/folder-open-mi.gif',
 				expandImage: 'images/folder-pl.gif',
 				leafImage: 'images/folder3.gif',
				collapsed: true
             });
         });

		// $('#folder_tree').live('change', function() {
		// 	if ($(this).attr('checked') == true) {
		// 		alert('checked');
		// 	} else {
		// 		alert('unchecked');
		// 	}
		// });
    //-->
    </script>
	
	
	<script type="text/javascript">
	
	var subFolder = new Array();
	<?php
		$directories = directory_list($repo_path, false, true);
	
		$mainFoldersArrayScript = "var mainFolders = new Array( ";
		$subFoldersArrayScript = "subFolder = new Array(); \n";
		
		$first_main = true;
		foreach($directories AS $dir_level_one => $val){
			if( !preg_match('/^\./', $dir_level_one) ){
				if($first_main){
					$mainFoldersArrayScript = $mainFoldersArrayScript."\"$dir_level_one\"";
				}else{
					$mainFoldersArrayScript = $mainFoldersArrayScript.",\"$dir_level_one\"";
				}
				$first_main = false;
				
				
				$subFoldersArrayScript = $subFoldersArrayScript." subFolder['$dir_level_one'] = new Array( ";
				$first_sub = true;
				foreach($val AS $dir_level_two => $trash){
					
					if($first_sub){
						$subFoldersArrayScript = $subFoldersArrayScript."\"$dir_level_two\"";
					}else{
						$subFoldersArrayScript = $subFoldersArrayScript.",\"$dir_level_two\"";
					}
					$first_sub = false;
				}
				$subFoldersArrayScript = $subFoldersArrayScript." ); \n";
			}
			
		}
		$mainFoldersArrayScript = $mainFoldersArrayScript." );";
		
		echo($mainFoldersArrayScript);
		echo($subFoldersArrayScript);
	?>
	
	// var mainFolders = new Array("BMW", "Ford");
	// var subFolder = new Array();
	// subFolder["BMW"] = new Array("318", "525", "650", "X5");
	// subFolder["Ford"] = new Array("Bronco", "Explorer", "Focus");

	function resetForm(theForm) {
	  /* reset mainFolders */
	  theForm.main_cat.options[0] = new Option("Please select folder..", "");
	  for (var i=0; i<mainFolders.length; i++) {
	    theForm.main_cat.options[i+1] = new Option(mainFolders[i], mainFolders[i]);
		if(mainFolders[i] == <?php echo("\"". trim( $_POST['main_cat'] ) ."\""); ?>){
			theForm.main_cat.options[i+1].selected = true;
			updateSubFolders(theForm);
		}
	  }
	  // theForm.main_cat.options[0].selected = true;
	  /* reset subFolder */
	  // theForm.sub_cat.options[0] = new Option("Please select a sub folder..", "");
	  // theForm.sub_cat.options[0].selected = true;
	}

	function updateSubFolders(theForm) {
	  var mainFolder = theForm.main_cat.options[theForm.main_cat.options.selectedIndex].value;
	  var newSubFolders = subFolder[mainFolder];
	  theForm.sub_cat.options.length = 0;
	  
	  if(newSubFolders.length != 0){
		theForm.sub_cat.options[0] = new Option("Please select a sub folder..", "");
	  }

	  for (var i=0; i<newSubFolders.length; i++) {
	    theForm.sub_cat.options[i+1] = new Option(newSubFolders[i], newSubFolders[i]);
		if(newSubFolders[i] == <?php echo("\"". trim( $_POST['sub_cat'] ) ."\""); ?>){
			theForm.sub_cat.options[i+1].selected = true;
		}
	  }
	  
	  // theForm.sub_cat.options[0].selected = true;
	}
	
	</script>
</head>

<body>
	<?php
		// echo($mainFoldersArrayScript);
		// echo($subFoldersArrayScript);
	?>
	<form name="gitFilesForm" action="<?php $PHP_SELF; ?>" method="POST">
		<div class="file_status" >
			<?php echo($status_message) ?>
		</div>
		<div class="folder_tree">
				<?php
					echo( arrayToTree( $directories, $folders, "folder_tree" ) );
				?>
		</div>
		<div class="group_settings">
			<label for="main_cat">Main Folder:</label>
			<select name="main_cat" onchange="updateSubFolders(this.form)">
			</select><br/>
			<label for="sub_cat">Sub Folder:</label>
			<select name="sub_cat">
			</select></br>
			<label for="file_folder">Folder Name:</label>
			<input type="text" id="file_folder" name="file_folder" size="70"
				class="file_folder" value="<?php echo( $_POST['file_folder'] ) ?>" /><br/>
		</div>
        <div class="file">
			
            <label for="file_title">File Name:</label>
            <input type="text" id="file_title" name="file_title" size="70" 
				class="fileTitle" value="<?php echo( $_POST['file_title'] ) ?>" /><br/>
            <label for="file_description">Description</label>
            <input type="text" id="file_description" name="file_description" size="70"
 				class="fileDescription"
				value="<?php echo( $_POST['file_description'] ) ?>" /><br/>
			<label for="file_tags">Tags</label>
            <input type="text" id="file_tags" name="file_tags" size="70"
				class="fileTags" value="<?php echo( $_POST['file_tags'] ) ?>" /><br/>
            <label for="file_code">Code</label>
            <textarea rows="5" cols="70" id="file_code" name="file_code" >
				<?php echo( $_POST['file_code'] ) ?></textarea>
	    </div>
	    <input type="submit" id="createFile" value="Add File"/>
	</form>
	<script type="text/javascript">

	  resetForm(document.gitFilesForm);
	
	</script>
</body>
</html>
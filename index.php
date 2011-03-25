<?php
	include_once('Git.php');
	include_once('Config.php');
	
	define("DIR", dirname(__FILE__));
	$repo_path = DIR.Config::repo;
	$source = Config::source;
	$status_message = "Add a code sample to github"; 
?>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<title>index</title>
	
</head>

<body>
	<form action="<?php $PHP_SELF; ?>" method="POST">
		<div class="status">
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
			
				if( !empty($_POST['file_title']) ){
					
					$f_title = trim( $_POST['file_title'] );
					$f_desc = trim( $_POST['file_description'] );
					$f_tags = trim( $_POST['file_tags'] );
					$f_code = trim( $_POST['file_code'] );
					
					// TITLE
					// if title not end in .js make it end in .js
					if( !preg_match('/.js$/',$f_title) ){
						$f_title = $f_title.".js";
					}
				
					// pull from origin
					$repo->run('pull');
					
					// If file already exits warn and stop
					$fileName = $repo_path."/".$f_title;
					if( file_exists($fileName) ){
						$status_message = 'Pick another name, a file with the name \''
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
							$repo->run('push origin master');
							
							$status_message = 'Successfully created file: '.$f_title;
						}catch (Exception $e) {
							$status_message = 'Error pushing to GitHub';
						}
						
						// Unset all POST params
						unset($_POST['file_title']);
						unset($_POST['file_description']);
						unset($_POST['file_tags']);
						unset($_POST['file_code']);
					}
				}
			?>
		</div>
        <div class="file">
			<div class="file_status" >
				<?php echo($status_message) ?>
			</div>
            <label for="file_title">Title/File Name:</label>
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
</body>
</html>
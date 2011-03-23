<?php
	include_once('Git.php');
	include_once('Config.php');
	
	define("DIR", dirname(__FILE__));
	$repo_path = DIR.Config::repo;
?>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en">
<head>
	<title>index</title>
	
</head>

<body>
	<form action="<?php $PHP_SELF; ?>" method="POST">
		<div class="status">
			<?php
				// open local repo
				$repo = Git::open($repo_path);
				// pull from origin
				$repo->run('pull');
				
				// if (! Git::is_repo($repo)) {
				// 	echo('Repo: FALSE');
				// } else {
				// 	echo('Repo: TRUE');
				// }
				
			
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
				
					
					$fileName = $repo_path."/".$f_title;
					if( file_exists($fileName) ){
						echo('Pick another name, a file with the name \''.$f_title.'\' already exists.');
					}else{
						
						$file = fopen($fileName,'w') or die ("can't open file");
						
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
						
						fwrite($file,$f_desc."\n\n");
						fwrite($file,$f_tags."\n\n");
						fwrite($file,$f_code."\n");
						fclose($file);
						
						// `git add *`
						$repo->add('*');
						
						// `git commit -av -m 'added files'`
						$commit_message = "added ".$f_title;
						$repo->commit($commit_message);
						// push out
						$repo->run('push origin master');
						
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
            <label for="file_title">Title</label>
            <input type="text" id="file_title" name="file_title" class="fileTitle" value="<?php echo( $_POST['file_title'] ) ?>" /><br/>
            <label for="file_description">Description</label>
            <input type="text" id="file_description" name="file_description" class="fileDescription" value="<?php echo( $_POST['file_description'] ) ?>" /><br/>
			<label for="file_tags">Tags</label>
            <input type="text" id="file_tags" name="file_tags" class="fileTags" value="<?php echo( $_POST['file_tags'] ) ?>" /><br/>
            <label for="file_code">Code</label>
            <textarea rows="5" cols="70" id="file_code" name="file_code" ><?php echo( $_POST['file_code'] ) ?></textarea>
	    </div>
	    <input type="hidden" name="login" value="dawsontoth" />
	    <input type="hidden" name="token" value="**INSERT TOKEN HERE**" />
	    <input type="submit" id="createFile" value="Add File"/>
	</form>
</body>
</html>
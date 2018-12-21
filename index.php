<?php
/*
Plugin Name: RBB Quiz
Plugin URI: 
Description: This is a RBB Quiz Plugin for MPAT
Author: Ahmed Basha
Author URI: https://www.linkedin.com/in/asalahb/
Version: 0.1
Template Name: Admin Panel
*/


/**
 * add new tab to the main menu once activate plugin
 */
add_action("admin_menu", "addMenu");
function addMenu(){
    add_menu_page("RBB Quiz", "RBB Quiz", "administrator", "rbb-quiz", "rbbQuiz" );
    // add_submenu_page("example_options", "Option 1", "Option 1", 4, "example-option-1", "option1");
}

/**
 * function to add Bootstrap core style link to the header
 */
function add_bootstrap_style() {
    echo '<link href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">';
}
add_action('wp_head', 'add_bootstrap_style');
add_action('admin_head', 'add_bootstrap_style');


/**
 * function to add Bootstrap core scripts to the footer
 */
function add_bootstrap_script() {
    echo '<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous"></script>';
    echo '<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.bundle.min.js" integrity="sha384-pjaaA8dDz/5BgdFUPX6M/9SUZv4d12SUPF0axWc+VRZkx5xU3daN+lYb49+Ax+Tl" crossorigin="anonymous"></script>';
}
add_action('wp_footer', 'add_bootstrap_script');
add_action('admin_footer', 'add_bootstrap_script');

/**
 * the main function which loading the main plugin page
 */
function rbbQuiz(){
    ?>
    <div class="wrap container">
        <div id="primary" class="content-area">
            <main id="main" class="site-main" role="main">
                <form method="post">
                    <div class="form-group">
                        <label for="number">Question Number</label>
                        <input type="number" class="form-control" name="number" id="number" placeholder="Question Number">
                    </div>
                    <div class="form-group">
                        <label for="correct">Correct Answer</label>
                        <div>
                            <input type="radio" id="ans1" name="correct_ans" value="A">A<br>
                            <input type="radio" id="ans2" name="correct_ans" value="B">B<br>
                            <input type="radio" id="ans3" name="correct_ans" value="C">C<br>
                            <input type="radio" id="ans4" name="correct_ans" value="D">D
                        </div>
                    </div>
                    <br/>
                    <div class="form-group">
                        <label for="start-time">Start Time</label>
                        <input type="number" class="form-control" name="start_time" id="start-time" placeholder="Start Time in minutes">
                    </div>
                    <div class="form-group">
                        <label for="end-time">End Time</label>
                        <input type="number" class="form-control" name="end_time" id="end-time" placeholder="End Time in minutes">
                    </div>
                    <div class="form-group">
                        <label for="cost">Score</label>
                        <input type="number" class="form-control" name="cost" id="cost" placeholder="Score">
                    </div>
                    <input type="submit" name="btnSubmit" value="Submit Question" class="btn btn-primary">
                    <button type="submit" class="btn btn-success" hidden>Finish</button>
                </form>
            </main><!-- #main -->
        </div><!-- #primary -->
    </div><!-- .wrap -->
    <!--=============================================================-->
    <?php
    if (isset($_POST['btnSubmit'])) {
        global $wpdb;
        $number = $_POST['number'];
        $correct_ans = $_POST['correct_ans'];
        $start_time = $_POST['start_time'];
        $end_time = $_POST['end_time'];
        $cost = $_POST['cost'];
        $tbl_name = $wpdb->prefix . 'rbb_quiz_questions';
        try {
            $rowResult = $wpdb->insert($tbl_name, 
                array(
                    'number' => $number,
                    'correct_ans' => $correct_ans,
                    'start_time' => $start_time,
                    'end_time' => $end_time,
                    'cost' => $cost
                ),
                $format = NULL
            );
            if ($rowResult == 1) {
                echo '<h2>Form has been submitted successfully!</h2>';
            } else {
                wp_die("<h2>Something is NOT correct!!</h2>");
            }
        }
        catch(Exception $e) {
            echo '<h2>Error Form Submission! \\n Message: ',  $e->getMessage(), '</h2>', "\n";
        }
        die;
    }
}


/**
 * function to select the question data from database and send this data to another JS file
 */
function get_question_data() {
    if( is_page(179) || is_page('RBB Quiz')) { //13   
        echo "<p id='current'></p>";
        global $wpdb;
        // reading data from rbb_quiz_questions table in database
        $start_time_col = $wpdb->get_col("SELECT start_time FROM rbb_quiz_questions");
        $end_time_col = $wpdb->get_col("SELECT end_time FROM rbb_quiz_questions");
        $cost_col = $wpdb->get_col("SELECT cost FROM rbb_quiz_questions");
        wp_enqueue_script('my-js', get_template_directory_uri() . 'script.js'); 
        wp_localize_script('my-js', 'passedObject', array(
                'start_time_col' => $start_time_col,
                'end_time_col' => $end_time_col,
                'cost_col' => $cost_col
            )
        );
    } 
}
add_action('wp_footer', 'get_question_data');
//add_action('admin_footer', 'get_question_data');


/**
 * Add RBB Quiz page on pulgin activation
 */
function install_rbb_pg(){
    if ( ! current_user_can( 'activate_plugins' ) ) return;
    $new_page_title = 'RBB Quiz';
    $new_page_content = 'This is your page content that automatically gets inserted into the RBB Quiz page!';
    $new_page_template = ''; //ex. template-custom.php. Leave blank if you don't want a custom page template.
    $page_check = get_page_by_title($new_page_title);
    $new_page = array(
        'post_type' => 'page',
        'post_title' => $new_page_title,
        'post_content' => $new_page_content,
        'post_status' => 'publish',
        'post_author' => 1,
    );
    if(!isset($page_check->ID)){
        $new_page_id = wp_insert_post($new_page);
        if(!empty($new_page_template)){
                update_post_meta($new_page_id, '_wp_page_template', $new_page_template);
        }
    }
}
register_activation_hook(__FILE__, 'install_rbb_pg');


/**
 * Add RBB Custom Template to our newly created page
 */
add_filter( 'page_template', 'wp_page_template' );
function wp_page_template( $page_template )
{
    if ( is_page($page = 'RBB Quiz') ) {
        $page_template = plugin_dir_path( __FILE__ ) . 'rbb-page.php';
    }
    return $page_template;
}


/**
 * create rbb_quiz_questions table in databasee
 */				
function create_rbb_quiz_table() {
    if ( ! current_user_can( 'activate_plugins' ) ) return;
   	global $wpdb;
    $tbl_name = $wpdb->prefix . 'rbb_quiz_questions';
    $charset_collate = $wpdb->get_charset_collate();
	if($wpdb->get_var("show tables like '$tbl_name'") != $tbl_name) 
	{
		$sql = "CREATE TABLE $tbl_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            number tinyint NOT NULL,
            correct_ans tinytext NOT NULL,
            start_time tinytext NOT NULL,
            end_time tinytext NOT NULL,
            cost tinytext NOT NULL,
            PRIMARY KEY (id)
		) $charset_collate;";
		require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
		dbDelta($sql);
	}
}
register_activation_hook(__FILE__,'create_rbb_quiz_table');


/**
 * remove rbb_quiz_questions table when deactivate plugin
 */
function remove_rbb_quiz_table() {
    global $wpdb;
    $tbl_name = $wpdb->prefix . 'rbb_quiz_questions';
    $sql = "DROP TABLE IF EXISTS $tbl_name";
    $wpdb->query($sql);
} 
register_deactivation_hook(__FILE__, 'remove_rbb_quiz_table');
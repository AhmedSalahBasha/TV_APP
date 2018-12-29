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
function addMenu() {
    add_menu_page(
        "RBB Quiz",         // page title
        "RBB Quiz",         // menu title
        "administrator",    // capability
        "rbb-quiz",         // menu slug
        "rbbQuiz"           // callback function
    );

    add_submenu_page(
        "rbb-quiz",         // parent slug
        "Questions Panel",     // page title
        "Questions Panel",     // menu title
        "administrator",    // capability
        "questions-page",      // menu slug
        "questionsPage"        // callback function
    );

    add_submenu_page(
        "rbb-quiz",         // parent slug
        "Design Panel",     // page title
        "Design Panel",     // menu title
        "administrator",    // capability
        "design-page",      // menu slug
        "designPage"        // callback function
    );
}


/**
 * load external libraries 
 */
function prefix_enqueue() {
    // Bootstrap JS
    wp_register_script('prefix_bootstrap', '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js');
    wp_enqueue_script('prefix_bootstrap');

    // Bootstrap CSS
    wp_register_style('prefix_bootstrap', '//maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css');
    wp_enqueue_style('prefix_bootstrap');

    // Jquery 
    wp_register_script( 'jQuery', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.12.4/jquery.min.js');
    wp_enqueue_script('jQuery');
    
    // jsColor
    wp_register_script( 'jsColor', 'https://cdnjs.cloudflare.com/ajax/libs/jscolor/2.0.4/jscolor.min.js');
    wp_enqueue_script('jsColor');
}
add_action("admin_enqueue_scripts", "prefix_enqueue");


/**
 * the main function which loading the main plugin page
 */
function rbbQuiz(){
    $html_form = plugin_dir_path( __FILE__ ) . "/includes/templates/main.html";
    if ( file_exists( $html_form ) )
        require $html_form;
}

/**
 * handling the ajax post request from add_question_form
 */
add_action( 'wp_ajax_submit_question_form', 'submit_question_form' );
add_action( 'wp_ajax_nopriv_submit_question_form', 'submit_question_form' );
function submit_question_form() {
    if (isset($_POST['number'])) {
        global $wpdb;
        $number = $_POST['number'];
        $number_of_answers = $_POST['number_of_answers'];
        $correct_ans = $_POST['correct_ans'];
        $start_time = $_POST['start_time'];
        $end_time = $_POST['end_time'];
        $cost = $_POST['cost'];
        $tbl_name = $wpdb->prefix . 'rbb_quiz_questions';
        try {
            $rowResult = $wpdb->insert($tbl_name, 
                array(
                    'number' => $number,
                    'number_of_answers' => $number_of_answers,
                    'correct_ans' => $correct_ans,
                    'start_time' => $start_time,
                    'end_time' => $end_time,
                    'cost' => $cost
                ),
                $format = NULL
            );
            if ($rowResult == 1) {
                wp_send_json_success(array(
                    'message' => '<h3>Form has been submitted successfully!</h3>', 
                    'status' => 1
                ));
            } else {
                wp_send_json_error(array(
                    'message' => '<h3>Error Form Submission!</h3>',
                    'status' => 0
                ));
            }
            die();
            wp_die();
        }
        catch(Exception $e) {
            wp_send_json_error(array(
                'message' => '<p>Connection Error! >> '+$e+'</p>',
                'status' => 0
            ));
            // echo '<h2>Connection Error! \\n Error Message: ',  $e->getMessage(), '</h2>', "\n";
        }
    }
}


/**
 * handling the ajax post request from question_style_form
 */
add_action( 'wp_ajax_submit_question_style_form', 'submit_question_style_form' );
add_action( 'wp_ajax_nopriv_submit_question_style_form', 'submit_question_style_form' );
function submit_question_style_form() {
    if (isset($_POST['button_number'])) {
        global $wpdb;
        $number_of_answers = $_POST['number_of_answers'];
        $button_number = $_POST['button_number'];
        $background_color = $_POST['background_color'];
        $button_text = $_POST['button_text'];
        $border = $_POST['border'];
        $border_radius = $_POST['border_radius'];
        $border_width = $_POST['border_width'];
        $font_color = $_POST['font_color'];
        $padding = $_POST['padding'];
        $position_top = $_POST['position_top'];
        $position_left = $_POST['position_left'];
        $font_size = $_POST['font_size'];
        $tbl_name = $wpdb->prefix . 'question_style';
        try {
            $rowResult = $wpdb->insert($tbl_name, 
                array(
                    'number_of_answers' => $number_of_answers,
                    'button_number' => $button_number,
                    'background_color' => $background_color,
                    'button_text' => $button_text,
                    'border' => $border,
                    'border_radius' => $border_radius,
                    'border_width' => $border_width,
                    'font_color' => $font_color,
                    'padding' => $padding,
                    'position_top' => $position_top,
                    'position_left' => $position_left,
                    'font_size' => $font_size,
                ),
                $format = NULL
            );
            if ($rowResult == 1) {
                wp_send_json_success(array(
                    'message' => '<h3>Form has been submitted successfully!</h3>', 
                    'status' => 1,
                ));
            } else {
                wp_send_json_error(array(
                    'message' => '<h3>Error Form Submission!</h3>',
                    'status' => 0,
                ));
            }
            die();
            wp_die();
        }
        catch(Exception $e) {
            wp_send_json_error(array(
                'message' => '<p>Connection Error! >> '+$e+'</p>',
                'status' => 0
            ));
        }
    }
}


/**
 * loading the questions page form
 */
function questionsPage() {
    $html_form = plugin_dir_path( __FILE__ ) . "/includes/templates/add-question-form.html";
    if ( file_exists( $html_form ) )
        require $html_form;
}


/**
 * loading the design page
 */
function designPage() {
    $html_form = plugin_dir_path( __FILE__ ) . "/includes/templates/design-panel.html";
    if ( file_exists( $html_form ) )
        require $html_form;
}


/**
 * function to select the question data from database and send this data to viewer JS file
 */
function get_question_data() {
    if(is_page('RBB Quiz')) {
        echo "<p id='current'></p>";
        global $wpdb;
        // reading data from rbb_quiz_questions table in database
        $questionsRows = $wpdb->get_results("SELECT * FROM wp_rbb_quiz_questions", ARRAY_A);
        wp_register_script('viewer_script', plugins_url("/includes/scripts/viewer.js", __FILE__));
        wp_enqueue_script('viewer_script');
        wp_localize_script('viewer_script', 'questionsTable', array(
                'questionsRows' => $questionsRows
            )
        );
    } 
}
add_action('wp_footer', 'get_question_data');


/**
 * function to select the question style data from database and send this data to viewer JS file
 */
function get_question_style() {
    if(is_page('RBB Quiz')) {   
        echo "<p id='current'></p>";
        global $wpdb;
        // reading data from rbb_quiz_questions table in database
        $questionStyleRows = $wpdb->get_results("SELECT * FROM wp_question_style", ARRAY_A);
        wp_register_script('viewer_script', plugins_url("/includes/scripts/viewer.js", __FILE__));
        wp_enqueue_script('viewer_script');
        wp_localize_script('viewer_script', 'questionStyleTable', array(
                'questionStyleRows' => $questionStyleRows
            )
        );
    }
}
add_action('wp_footer', 'get_question_style');


/**
 * Add RBB Quiz page on pulgin activation
 */
function install_rbb_pg(){
    if ( ! current_user_can( 'activate_plugins' ) ) return;
    $new_page_title = 'RBB Quiz';
    $new_page_content = 'Welcome to the RBB Quiz main page!';
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
// add_filter( 'page_template', 'wp_page_template' );
// function wp_page_template( $page_template ){
//     if ( is_page($page = 'RBB Quiz') ) {
//         $page_template = plugin_dir_path( __FILE__ ) . 'rbb-page.php';
//     }
//     return $page_template;
// }


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
            number tinytext NOT NULL,
            number_of_answers tinytext NOT NULL,
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
 * create question_style table in databasee
 */				
function create_question_style_table() {
    if ( ! current_user_can( 'activate_plugins' ) ) return;
   	global $wpdb;
    $tbl_name = $wpdb->prefix . 'question_style';
    $charset_collate = $wpdb->get_charset_collate();
	if($wpdb->get_var("show tables like '$tbl_name'") != $tbl_name) 
	{
		$sql = "CREATE TABLE $tbl_name (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            number_of_answers tinytext NOT NULL,
            button_number tinytext NOT NULL,
            background_color tinytext NOT NULL,
            button_text tinytext NOT NULL,
            border tinytext NOT NULL,
            border_radius tinytext NOT NULL,
            border_width tinytext NOT NULL,
            font_color tinytext NOT NULL,
            padding tinytext NOT NULL,
            position_top tinytext NOT NULL,
            position_left tinytext NOT NULL,
            font_size tinytext NOT NULL,
            PRIMARY KEY (id)
		) $charset_collate;";
		require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
		dbDelta($sql);
	}
}
register_activation_hook(__FILE__,'create_question_style_table');


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


/**
 * remove question_style table when deactivate plugin
 */
function remove_question_style_table() {
    global $wpdb;
    $tbl_name = $wpdb->prefix . 'question_style';
    $sql = "DROP TABLE IF EXISTS $tbl_name";
    $wpdb->query($sql);
} 
register_deactivation_hook(__FILE__, 'remove_question_style_table');
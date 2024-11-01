<?php
/**
 * Plugin Name: Tasti Rapidi
 * Plugin URI: https://4wp.it/tasti-rapidi-plugin
 * Description: Tasti rapidi delle funzionalità WordPress
 * Author: Roberto Bottalico
 * Author URI: https://4wp.it/roberto-bottalico/
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Version: 1.0
 */

/**
 * Scripts di Tasti Rapidi
 */
function tastirapidi_scripts() {
    global $post;
    
    $post_id = $post == null ? 0 : $post->ID;
    
    wp_enqueue_script('jquery');
    wp_enqueue_script('mice', plugins_url('mousetrap.min.js', __FILE__));
    wp_enqueue_script('tastirapidi', plugins_url('tastirapidi.js', __FILE__));
    wp_localize_script('tastirapidi', 'tastirapidi', array(
        'home' => home_url('/'),
        'dashboard' => admin_url('/'),
        'settings' => admin_url('options-general.php'),
        'plugins' => admin_url('plugins.php'),
        'themes' => admin_url('themes.php'),
        'pages' => admin_url('edit.php?post_type=page'),
        'post_all' => admin_url('edit.php'),
        'post_new' => admin_url('post-new.php'),
        'page_all' => admin_url('edit.php?post_type=page'),
        'page_new' => admin_url('post-new.php?post_type=page'),
        'edit_link' => get_edit_post_link( $post_id ),
        'users' => admin_url('users.php'),
        'permalinks' => admin_url('options-permalink.php'),
        'login' => is_user_logged_in() ? wp_logout_url() : wp_login_url(),
        'current_page' => get_permalink(),
        'edit_comments' => admin_url('edit-comments.php'),
    ) );
    
    wp_enqueue_style('tastirapidi', plugins_url('tastirapidi.css', __FILE__));
}

add_action('wp_enqueue_scripts', 'tastirapidi_scripts');
add_action('admin_enqueue_scripts', 'tastirapidi_scripts');

/**
 * Comandi dell'area Help
 */
function tastirapidi_help() {
    ?>
    <div id="tastirapidi">
        <div class="inner">
            <h1>Tasti Rapidi</h1>
            
            
            <table>
                <tr>
                    <td class="divide">
                        <table>
                            <?php tastirapidi_help_comandi(array('v', 'h'), 'home', __( 'Vai alla Home', 'trap' )); ?>
                            <?php tastirapidi_help_comandi(array('v', 'l'), 'login', __( 'Vai alla pagina di Login', 'trap' )); ?>
                            <?php tastirapidi_help_comandi(array('v', 'd'), 'dashboard', __( 'Vai alla dashboard', 'trap' )); ?>
                            <?php tastirapidi_help_comandi(array('v', 'c'), 'commenti', __( 'Vai alla pagina commenti', 'trap' )); ?>
                            <?php tastirapidi_help_comandi(array('v', 't'), 'temi', __( 'Vai alla pagina dei temi', 'trap' )); ?>
                            <?php tastirapidi_help_comandi(array('v', 'p'), 'plugins', __( 'Vai alla pagina dei plugin', 'trap' )); ?>
                            <?php tastirapidi_help_comandi(array('v', 'u'), 'utenti', __( 'Vai alla pagina utenti', 'trap' )); ?>
                            <?php tastirapidi_help_comandi(array('v', 'i'), 'impostazioni', __( 'Vai alla pagina impostazioni', 'trap' )); ?>
                        </table>                    
                    </td>
                    <td class="divide">
                        <table>
                            <?php tastirapidi_help_comandi(array('?'), 'help', __( 'Apri l\'area di aiuto', 'trap' )); ?>
                            <?php tastirapidi_help_comandi(array('Ctrl + s'), 'salva', __( 'Salvataggio Articolo/Pagina', 'trap' )); ?>
                            <?php tastirapidi_help_comandi(array('r'), 'ricarica', __( 'Ricarica la pagina corrente', 'trap' )); ?>
                            <?php tastirapidi_help_comandi(array('m'), 'modifica', __( 'Modifica la pagina o articolo corrente', 'trap' )); ?>
                            
                            <?php tastirapidi_help_comandi(array('v', 'a'), 'tutti gli articoli', __( 'Visualizza tutti gli articoli', 'trap' )); ?>
                            <?php tastirapidi_help_comandi(array('v', 'n'), 'nuovo articolo', __( 'Crea un nuovo articolo', 'trap' )); ?>
                            <?php tastirapidi_help_comandi(array('Shift + v', 'p'), 'tutte le pagine', __( 'Visualizza tutte le pagine', 'trap' )); ?>
                            <?php tastirapidi_help_comandi(array('Shift + v', 'n'), 'nuova pagina', __( 'Crea una nuova pagina', 'trap' )); ?>
                        </table>
                    
                    </td>
                </tr>
            </table>
            
            
            
        </div>
    </div>
    <?php
}

add_action( 'wp_footer', 'tastirapidi_help' );
add_action( 'admin_footer', 'tastirapidi_help' );

/**
 * Visualizza il singolo aiuto del comando
 * 
 * @param array $args chiave combinazione del comando
 * @param string $abbr abbrevazione
 * @param string $desc descrizione comando
 */
function tastirapidi_help_comandi($args, $abbr = '', $desc = '') {
    $cmd = array();
    $glue = ' <span class="epoi"> e poi </span> ';
    
    foreach( $args as $arg ) {
        $cmd[] = '<span class="cmd">' . $arg . '</span>';
    }
    ?>
    <tr>
        <td><?php echo implode( $glue, $cmd); ?></td>
        <td><?php echo $abbr == '' ? '&nbsp' : '<span class="help">&rarr; ' . $abbr . '</span>' ?></td>
        <td><?php echo $desc == '' ? '&nbsp' : $desc; ?></td>
    </tr>    
    <?
}


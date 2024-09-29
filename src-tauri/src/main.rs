// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod events;
mod scripts;

use events::{create_menu, handle_menu_event};
use scripts::pathfinder::get_star_citizen_versions;
use scripts::translations_links::get_translations;
use scripts::translation_functions::{is_game_translated, init_translation_files, is_translation_up_to_date, update_translation, uninstall_translation};
use scripts::translation_preferences::{save_translations_selected, load_translations_selected};
fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![
      get_star_citizen_versions,
      get_translations,
      is_game_translated,
      init_translation_files,
      is_translation_up_to_date,
      update_translation,
      uninstall_translation,
      save_translations_selected,
      load_translations_selected
    ])
    .menu(create_menu())
    .on_menu_event(|event| handle_menu_event(&event.window(), event.menu_item_id()))  
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

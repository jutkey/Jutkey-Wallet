#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
use tauri::Manager;
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}
#[tauri::command]
fn is_tauri() -> String {
    format!("tauri")
}

#[tauri::command]
fn close_tauri(window: tauri::Window) {
  // close window;
  window.close().unwrap();
  /* if let Some(splashscreen) = window.get_window("splashscreen") {
    splashscreen.close().unwrap();
  } */
  // open window
  // window.get_window("main").unwrap().show().unwrap();
}

#[tauri::command]
fn close_splashscreen(window: tauri::Window) {
  // close mian view
  if let Some(splashscreen) = window.get_window("splashscreen") {
    splashscreen.close().unwrap();
  }
  // show main wiew
  window.get_window("main").unwrap().show().unwrap();
}
fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet,is_tauri,close_tauri,close_splashscreen])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

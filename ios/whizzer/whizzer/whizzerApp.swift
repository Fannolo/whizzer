//
//  whizzerApp.swift
//  whizzer
//
//  Created by Diego Carlino on 19/06/22.
//

import SwiftUI
import Firebase

@main
struct whizzerApp: App {
    
    init() {
        FirebaseApp.configure()
    }
    
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}

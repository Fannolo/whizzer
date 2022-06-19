//
//  ContentView.swift
//  whizzer
//
//  Created by Diego Carlino on 19/06/22.
//

import SwiftUI

struct ContentView: View {
    @StateObject var dishManager = DishManager()
    
    var body: some View {
        NavigationView {
            List(dishManager.dishes) { dish in
                NavigationLink(destination: DishView(dish: dish)) {
                    HStack {
                        FirebaseImage(imageName: dish.code)
                            .frame(width: 50, height: 50)
                            .cornerRadius(10.0)
                        Text(dish.item)
                    }
                }
            }
            .navigationTitle("Menu")
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}

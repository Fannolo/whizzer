//
//  DishManager.swift
//  whizzer-native
//
//  Created by Diego Carlino on 13/06/22.
//

import Foundation
import FirebaseFirestore
import FirebaseFirestoreSwift

class DishManager: ObservableObject {
    @Published private(set) var dishes: [Dish] = []
    let db = Firestore.firestore()
    
    init() {
        getDishes()
    }
    
    func getDishes() {
        db.collection("test").addSnapshotListener { snapshot, error in
            guard let documents = snapshot?.documents else {
                print("ERROR")
                return
            }
            
            self.dishes = documents.compactMap { document -> Dish? in
                do {
                    return try document.data(as: Dish.self)
                } catch {
                    print("ERROR: \(error)")
                    return nil
                }
            }
        }
    }
}

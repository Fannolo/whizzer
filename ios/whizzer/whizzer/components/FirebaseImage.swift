//
//  FirebaseImage.swift
//  whizzer-native
//
//  Created by Diego Carlino on 13/06/22.
//

import SwiftUI
import FirebaseStorage

struct FirebaseImage: View {
    var imageName: String
    
    @State private var imageURL = URL(string: "")

    var body: some View {
        AsyncImage(url: imageURL) { image in
            image.resizable()
        } placeholder: {
            ProgressView()
        }
        .onAppear(perform: loadImageFromFirebase)
    }

    func loadImageFromFirebase() {
       let storage = Storage
            .storage()
            .reference(withPath: "test/\(imageName).jpg")
        
       storage.downloadURL { (url, error) in
           if let error = error {
               print((error.localizedDescription))
               return
           }
           
           self.imageURL = url!
       }
    }
}

struct FirebaseImage_Previews: PreviewProvider {
    static var previews: some View {
        FirebaseImage(imageName: "101")
    }
}

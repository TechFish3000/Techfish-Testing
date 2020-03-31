





//create the block type

const teleporter = extendContent(Block, "teleporter", {

    //override the method to build configuration

    buildConfiguration(tile, table) {
        

        table.addImageButton(Icon.upOpen, Styles.clearTransi, run(() => {

            //configure the tile to signal that it has been pressed (this sync on client to server)

            print(tile.entity.cons)
            tile.configure(0)


        })).size(50)

        table.addImageButton(Icon.line, Styles.clearTransi, run(() => {

            



        })).size(50)
        table.addImageButton(Icon.downOpen, Styles.clearTransi, run(() => {

            
            




        })).size(50)



    },

    

    
}
)


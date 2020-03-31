





//create the block type

const testblock = extendContent(Block, "testblock", {

    //override the method to build configuration

    buildConfiguration(tile, table) {
        

        table.addImageButton(Icon.upOpen, Styles.clearTransi, run(() => {

            //configure the tile to signal that it has been pressed (this sync on client to server)

            print(tile.entity.cons)
            print(this.data)
            print(tile.x)
            print(tile.y)
            tile.configure(0)


        })).size(50)

        table.addImageButton(Icon.line, Styles.clearTransi, run(() => {


            this.data = this.data + { a: this.i }
            this.i++


        })).size(50)
        table.addImageButton(Icon.downOpen, Styles.clearTransi, run(() => {

            
            
            



        })).size(50)



    },

    

    
}
)


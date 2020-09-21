
var linked = false

var linking = false

var activated = false

var linkerx = 0
var linkery = 0

var linkAx = []
var linkAy = []
var linkBx = []
var linkBy = []

var pauseframe = 0

var t1 = null

var t2 = null

var dist
var delta_x
var delta_y
var theta_radians

var fr = 0

var shotsleft = new Array()

const maxshots = 100
const shotsperitem = 20
//create the block type

const laserwall = extendContent(Block, "laserwall", {

    //override the method to build configuration

    buildConfiguration(tile, table) {
        // iteration 1: FAILED
        //table.addImageButton(Icon.upOpen, Styles.clearTransi, run(() => {

        //    //configure the tile to signal that it has been pressed (this sync on client to server)
        //    tile.configure(0)
        //    f = 0
        //})).size(50).disabled(boolf(b => tile.entity != null && !tile.entity.cons.valid()))
        //iteration 4:

        table.addImageButton(Icon.upOpen, Styles.clearTransi, run(() => {

            //configure the tile to signal that it has been pressed (this sync on client to server)

            if (!linking) {
                linkerx = tile.x
                linkery = tile.y
                linking = true
                print("initiated linking at x: " + linkerx + " y: " + linkery)
            }
            else {
                linking = false


                linkAx.push(linkerx)
                linkAy.push(linkery)
                linkBx.push(tile.x)
                linkBy.push(tile.y)
                shotsleft.push(0)
                linkerx = 0
                linkery = 0
                print("link complete between " + linkAx[linkAx.length - 1] + ", " + linkAy[linkAy.length - 1] + " and " + linkBx[linkBx.length - 1] + ", " + linkBy[linkBy.length - 1])
            }



            tile.configure(0)


        })).size(50).disabled(linkAx.indexOf(tile.x) != -1 || linkBx.indexOf(tile.x) != -1 || (linkerx == tile.x && linkery == tile.y))

        table.addImageButton(Icon.line, Styles.clearTransi, run(() => {

            if (activated) {
                activated = false
                print("deactivated")
            }
            else {
                activated = true
                print("activated")
            }




        })).size(50).disabled(tile.entity == null || (linkAx.length == linkBx.length == linkAy.length == linkBy.length) && linkBy.length == 0)
        table.addImageButton(Icon.downOpen, Styles.clearTransi, run(() => {

            print("deleted link between " + linkAx.pop() + ", " + linkAy.pop() + " and " + linkBx.pop() + ", " + linkBy.pop())
            shotsleft.pop()




        })).size(50).disabled(tile.entity == null || (linkAx.length == linkAy.length == linkBx.length == linkBy.length) && linkBy.length == 0)



    },

    //override configure event, no longer needed since iteration 3

    //configured(tile, value) {

    //make sure this silo has the items it needs to fire

    //print("value: " + value)
    //print("tile: " + tile)
    //print("ho")

    //if (t == 1 && linked) {
    //let delta_x = linkerx - tile.entity.x
    //let delta_y = linkery - tile.entity.y
    //theta_radians = Math.atan2(delta_y, delta_x)
    //dist = Math.sqrt(Math.pow(Math.abs(linkerx - tile.entity.x), 2) + Math.pow(Math.abs(delta_y = linkery - tile.entity.y), 2))


    //}




    //},

    //override update event

    update(tile) {

        if (linkAx.length == 0 && activated) {
            activated = false
        }

        t1 = linkAx.indexOf(tile.x)
        t2 = linkAy.indexOf(tile.y)
        if (this.shotsleft > 0 && !pauseframe) {

            if (t1 != -1 && t2 != -1 && t1 == t2 && activated) {

                delta_x = linkAx[t1] - linkBx[t1]

                delta_y = linkAy[t2] - linkBy[t2]

                theta_radians = Math.atan2(delta_y, delta_x)

                dist = Math.sqrt(Math.pow(Math.abs(delta_x), 2) + Math.pow(Math.abs(delta_y), 2))


                Calls.createBullet(Bullets.flakExplosive, tile.getTeam(), tile.drawx(), tile.drawy(), 180 + (theta_radians * (180 / Math.PI)), 1, dist / 20)

            }
        }
        else if (pauseframe) {
            pauseframe = false
        }
        if (tile.entity.cons.valid() && shotsleft[t1] < maxshots - shotsperitem + 1 && t1 == t2 && t2 != -1) {
            shotsleft[t1] += shotsperitem
            tile.entity.cons.trigger()
        }
    }
}
)


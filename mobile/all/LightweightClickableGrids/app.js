/**
 * Creates a grid that you can click on.
 * @param options
 */
function createGrid(options) {

    // default options
    var defaultOptions = {
        gridViewOptions: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        },
        rows: 20,
        columns: 20,
        selectedCellOptions: {
            backgroundColor: '#f33'
        },
        strokeColor: '#000',
        strokeWidth: 1,
        click: null
    };

    // merge default options into current options
    options = options || {};
    for (var n in defaultOptions) {
        if (defaultOptions.hasOwnProperty(n)) {
            options[n] = options[n] || defaultOptions[n];
        }
    }

    // create our grid
    var grid = Ti.UI.createView(options.gridViewOptions);
    var widthPercentIncrement = (1 / options.columns) * 100;
    var heightPercentIncrement = (1 / options.rows) * 100;

    // add columns and rows asynchronously
    setTimeout(function() {
        for (var i = 1; i < options.columns; i++) {
            grid.add(Ti.UI.createView({
                backgroundColor: options.strokeColor,
                top: 0, bottom: 0, width: options.strokeWidth,
                left: widthPercentIncrement * i + '%',
                ignoreClicks: true
            }));
        }
        for (var j = 1; j < options.rows; j++) {
            grid.add(Ti.UI.createView({
                backgroundColor: options.strokeColor,
                left: 0, right: 0, height: options.strokeWidth,
                top: heightPercentIncrement * j + '%',
                ignoreClicks: true
            }));
        }
    }, 1);

    // add event listener
    var selectedCells = {}, recycledViews = [];
    grid.addEventListener('click', function(evt) {
        var source = evt.source;
        if (source.ignoreClicks) {
            return;
        }
        // figure out which column and row was clicked
        var column, row, cell;
        if (source.column) {
            column = source.column;
            row = source.row;
            cell = source;
        }
        else {
            column = parseInt(evt.x / source.width * options.columns);
            row = parseInt(evt.y / source.height * options.rows);
            cell = false;
        }

        // control if the cell is filled in
        var selected = selectedCells[column + '-' + row] == null;
        if (selected) {
            // reuse existing views, if possible
            cell = cell || recycledViews.pop() || Ti.UI.createView(options.selectedCellOptions);
            cell.left = widthPercentIncrement * column + '%';
            cell.right = widthPercentIncrement * (options.columns - column - 1) + '%';
            cell.top = heightPercentIncrement * row + '%';
            cell.bottom = heightPercentIncrement * (options.rows - row - 1) + '%';
            cell.column = column;
            cell.row = row;
            selectedCells[column + '-' + row] = cell;
            grid.add(cell);
        }
        else {
            // recycle view for later use
            cell = cell || selectedCells[column + '-' + row];
            recycledViews.push(cell);
            grid.remove(cell);
            selectedCells[column + '-' + row] = null;
        }

        // fire off the child click event
        if (options.click) {
            options.click({
                source: source,
                x: evt.x,
                y: evt.y,
                globalPoint: evt.globalPoint,
                row: row,
                column: column,
                selected: selected
            });
        }
    });

    // add access to selected cells

    return grid;
}

var window = Ti.UI.createWindow({
    backgroundColor: '#ccc'
});

window.add(createGrid({
    selectedCellOptions: {
        backgroundImage: 'default_app_logo.png',
        backgroundColor: '#fff'
    },
    click: function(evt) {
        alert('You clicked ' + evt.row + 'x' + evt.column + ', and it is now ' + evt.selected);
    }
}));

window.open();
var config = {
  geojson: "./joined_gdf_centroids.geojson",
  title: "Vacant and Abandoned Properties in Philadelphia",
  layerName: "Properties",
  hoverProperty: "address",
  sortProperty: "guncrime_density",
  sortOrder: "desc"
};

var properties = [{
  value: "address",
  label: "Address",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string"
  },
  info: false
}, {
  value: "guncrime_density",
  label: "Gun Crime Rate",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string"
  },
  info: false
}, {
  value: "tree_canopy_gap",
  label: "Tree Canopy Gap",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string"
  },
  info: false
}, {
  value: "owner",
  label: "Owner(s)",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string"
  },
  info: false
}, {
  value: "public_owner",
  label: "Public Owner?",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "boolean"
  },
  info: false
}, {
  value: "comm_partn",
  label: "PHS Partner",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string"
  },
  info: false
}, {
  value: "type",
  label: "Parcel Type",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string"
  },
  info: false
}, {
  value: "blg_desc",
  label: "Parcel Description",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string"
  },
  info: false
}, {
  value: "li_complaints",
  label: "L&I Complaints",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string"
  },
  info: false
}, {
  value: "li_code_violations",
  label: "L&I Code Violations",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string"
  },
  info: false
}, {
  value: "councildistrict",
  label: "Council District",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string",
    input: "checkbox",
    vertical: true,
    multiple: true,
    operators: ["in", "not_in", "equal", "not_equal"],
    values: []
  }
}, {
  value: "zipcode",
  label: "Zip Code",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string",
    input: "checkbox",
    vertical: true,
    multiple: true,
    operators: ["in", "not_in", "equal", "not_equal"],
    values: []
  }
}, {
  value: "neighborhood",
  label: "Neighborhood",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string",
    input: "checkbox",
    vertical: true,
    multiple: true,
    operators: ["in", "not_in", "equal", "not_equal"],
    values: []
  }
}, {
  value: "relevant_rcos",
  label: "Relevant RCOs",
  table: {
    visible: true,
    sortable: true
  },
  filter: {
    type: "string"
  },
  info: false
}];

function drawCharts() {
// Public Owner
$(function() {
  var result = alasql(
    "SELECT public_owner AS label, COUNT(*) AS total FROM ? GROUP BY public_owner", [
      features
    ]);
  var columns = $.map(result, function(public_owner) {
    return [
      [public_owner.label, public_owner.total]
    ];
  });
  var chart = c3.generate({
    bindto: "#public-owner-chart",
    data: {
      type: "pie",
      columns: columns,
      names: {
        true: 'Public',
        false: 'Private'
      },
      colors: {
        true: '#ffa600',
        false: '#ffa600'
      }
    }
  });
});


// Guncrime Density
$(function() {
  var result = alasql(
    "SELECT guncrime_density AS label, COUNT(*) AS total FROM ? GROUP BY guncrime_density", [
      features
    ]);
  var columns = [
    ['Bottom 50%', 0],
    ['Top 50%', 0],
    ['Top 25%', 0],
    ['Top 10%', 0],
    ['Top 5%', 0],
    ['Top 1%', 0]
  ];

  // Update the count for each guncrime density
  result.forEach(function(guncrime_density) {
    switch (guncrime_density.label) {
      case 'Bottom 50%':
        columns[0][1] = guncrime_density.total;
        break;
      case 'Top 50%':
        columns[1][1] = guncrime_density.total;
        break;
      case 'Top 25%':
        columns[2][1] = guncrime_density.total;
        break;
      case 'Top 10%':
        columns[3][1] = guncrime_density.total;
        break;
      case 'Top 5%':
        columns[4][1] = guncrime_density.total;
        break;
      case 'Top 1%':
        columns[5][1] = guncrime_density.total;
        break;
    }
  });

  var chart = c3.generate({
    bindto: "#guncrime-bar",
    data: {
      type: "bar",
      columns: columns
    },
    color: {
      pattern: ['#003f5c',  '#444e86', '#955196', '#d518d2', '#ff6e54', '#ffa600']
      }
  });
});


// Tree Canopy gap
$(function() {
  var result = alasql(
    "SELECT tree_canopy_gap AS label, COUNT(*) AS total FROM ? GROUP BY tree_canopy_gap", [
      features
    ]);
  var columns = [
    ['Bottom 50%', 0],
    ['Top 50%', 0],
    ['Top 25%', 0],
    ['Top 10%', 0],
    ['Top 5%', 0],
    ['Top 1%', 0]
  ];

  // Update the count for each tree canopy gap
  result.forEach(function(tree_canopy_gap) {
    switch (tree_canopy_gap.label) {
      case 'Bottom 50%':
        columns[0][1] = tree_canopy_gap.total;
        break;
      case 'Top 50%':
        columns[1][1] = tree_canopy_gap.total;
        break;
      case 'Top 25%':
        columns[2][1] = tree_canopy_gap.total;
        break;
      case 'Top 10%':
        columns[3][1] = tree_canopy_gap.total;
        break;
      case 'Top 5%':
        columns[4][1] = tree_canopy_gap.total;
        break;
      case 'Top 1%':
        columns[5][1] = tree_canopy_gap.total;
        break;
    }
  });

  var chart = c3.generate({
    bindto: "#tree-canopy-bar",
    data: {
      type: "bar",
      columns: columns
    },
    color: {
      pattern: ['#003f5c',  '#444e86', '#955196', '#d518d2', '#ff6e54', '#ffa600']
      }
  });
});

  // Species
  $(function() {
    var result = alasql(
      "SELECT agency_partner AS label, COUNT(*) AS total FROM ? GROUP BY agency_partner ORDER BY label ASC", [
        features
      ]);
    var chart = c3.generate({
      bindto: "#species-chart",
      size: {
        height: 2000
      },
      data: {
        json: result,
        keys: {
          x: "label",
          value: ["total"]
        },
        type: "bar"
      },
      axis: {
        rotated: true,
        x: {
          type: "category"
        }
      },
      legend: {
        show: false
      }
    });
  });
}

$(function() {
  $(".title").html(config.title);
  $("#layer-name").html(config.layerName);
});

function buildConfig() {
  filters = [];
  table = [{
    field: "action",
    title: "<i class='fa fa-gear'></i>&nbsp;Action",
    align: "center",
    valign: "middle",
    width: "75px",
    cardVisible: false,
    switchable: false,
    formatter: function(value, row, index) {
      return [
        '<a class="zoom" href="javascript:void(0)" title="Zoom" style="margin-right: 10px;">',
        '<i class="fa fa-search-plus"></i>',
        '</a>',
        '<a class="identify" href="javascript:void(0)" title="Identify">',
        '<i class="fa fa-info-circle"></i>',
        '</a>'
      ].join("");
    },
    /*
    events: {
      "click .zoom": function(e, value, row, index) {
        map.fitBounds(featureLayer.getLayer(row.leaflet_stamp).getBounds());
        highlightLayer.clearLayers();
        highlightLayer.addData(featureLayer.getLayer(row.leaflet_stamp).toGeoJSON());
      },
      "click .identify": function(e, value, row, index) {
        identifyFeature(row.leaflet_stamp);
        highlightLayer.clearLayers();
        highlightLayer.addData(featureLayer.getLayer(row.leaflet_stamp).toGeoJSON());
      }
    }
    */
  }];



  $.each(properties, function(index, value) {
    // Filter config
    if (value.filter) {
      var id;
      if (value.filter.type == "integer") {
        id = "cast(properties->" + value.value + " as int)";
      } else if (value.filter.type == "double") {
        id = "cast(properties->" + value.value + " as double)";
      } else {
        id = "properties->" + value.value;
      }
      filters.push({
        id: id,
        label: value.label
      });
      $.each(value.filter, function(key, val) {
        if (filters[index]) {
          // If values array is empty, fetch all distinct values
          if (key == "values" && val.length === 0) {
            alasql("SELECT DISTINCT(properties->" + value.value +
              ") AS field FROM ? ORDER BY field ASC", [geojson.features],
              function(results) {
                distinctValues = [];
                $.each(results, function(index, value) {
                  distinctValues.push(value.field);
                });
              });
            filters[index].values = distinctValues;
          } else {
            filters[index][key] = val;
          }
        }
      });
    }
    // Table config
    if (value.table) {
      table.push({
        field: value.value,
        title: value.label
      });
      $.each(value.table, function(key, val) {
        if (table[index + 1]) {
          table[index + 1][key] = val;
        }
      });
    }
  });

  buildFilters();
  buildTable();
}

// Basemap Layers

var grayBasemap = L.tileLayer(
  "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
    maxZoom: 16,
  }
);

var featureStyle = function(properties, zoom) {
  const fillColor = properties.guncrime_density === 'Bottom 50%' ? '#003f5c' :
    properties.guncrime_density === 'Top 50%' ? '#444e86' :
    properties.guncrime_density === 'Top 25%' ? '#955196' :
    properties.guncrime_density === 'Top 10%' ? '#dd5182' :
    properties.guncrime_density === 'Top 5%' ? '#ff6e54' :
    properties.guncrime_density === 'Top 1%' ? '#ffa600' :
    '#808080';
  const fillOpacity = 0.5;

  return {
    stroke: false,
    fill: true,
    fillColor: fillColor,
    fillOpacity: fillOpacity,
  };
};

var exampleDataLayer = L.vectorGrid.protobuf(
  "https://api.mapbox.com/v4/nlebovits.cne7vaoz/{z}/{x}/{y}.vector.pbf?access_token={token}",
  {
    token: "pk.eyJ1IjoibmxlYm92aXRzIiwiYSI6ImNsZXQ2Nzd3ZDBjZnYzcHFvYXhib2RqYzQifQ.PWg2LuNCH1E6-REjmYvdOg",
    minZoom: 13,
    interactive: true,
    vectorTileLayerStyles: {
      "joined_gdf-dr7mul": featureStyle
    },
    getFeatureId: function(f) {
      return f.properties.opa_id;
    }
  }
)
exampleDataLayer.on("mouseover", function(e) {
  const popup = L.popup()
    .setLatLng(e.latlng)
    .setContent(`
      <h3>${e.layer.properties.address}</h3>
      <p>${e.layer.properties.guncrime_density}</p>
      <p>${e.layer.properties.owner}</p>
      <p>${e.layer.properties.opa_id}</p>
    `)
    .openOn(map);
});
exampleDataLayer.on("mouseout", function(e) {
  map.closePopup();
});

var highlightLayer = L.geoJson(null, {
  pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng, {
      radius: 5,
      color: "#FFF",
      weight: 2,
      opacity: 1,
      fillColor: "#00FFFF",
      fillOpacity: 1,
      clickable: false
    });
  },
  style: function(feature) {
    return {
      color: "#00FFFF",
      weight: 2,
      opacity: 1,
      fillColor: "#00FFFF",
      fillOpacity: 0.5,
      clickable: false
    };
  }
});
/*
var featureLayer = L.geoJson(null, {
  filter: function(feature, layer) {
    return feature.geometry.coordinates[0] !== 0 && feature.geometry.coordinates[
      1] !== 0;
  },
  style: function (feature) {
    return {
      color: feature.properties.color
    };
  },
  pointToLayer: function(feature, latlng) {
    if (feature.properties && feature.properties["marker-color"]) {
      markerColor = feature.properties["marker-color"];
    } else {
      markerColor = "#FF0000";
    }
    return L.circleMarker(latlng, {
      radius: 3,
      weight: 1,
      fillColor: markerColor,
      color: markerColor,
      opacity: 1,
      fillOpacity: 0.5
    });
  },
  onEachFeature: function(feature, layer) {
    if (feature.properties) {
      layer.on({
        click: function(e) {
          identifyFeature(L.stamp(layer));
          highlightLayer.clearLayers();
          highlightLayer.addData(featureLayer.getLayer(L.stamp(
            layer)).toGeoJSON());
        },
        mouseover: function(e) {
          if (config.hoverProperty) {
            $(".info-control").html(feature.properties[config.hoverProperty]);
            $(".info-control").show();
          }
        },
        mouseout: function(e) {
          $(".info-control").hide();
        }
      });
    }
  }
});
*/

// Fetch the GeoJSON file
$.getJSON(config.geojson, function(data) {
  geojson = data;
  features = $.map(geojson.features, function(feature) {
    return feature.properties;
  });
  /*featureLayer.addData(data);*/
  buildConfig();
  syncTable(geojson.features);
  $("#loading-mask").hide();
});

var map = L.map("map", {
  layers: [/*featureLayer,*/ highlightLayer],
  preferCanvas: true,
}).fitWorld();

/*
// Define custom search control using Nominatim geocoder
var searchControl = L.Control.extend({
  options: {
    position: 'bottomleft'
  },

  onAdd: function (map) {
    // Create search form element
    var searchForm = L.DomUtil.create('form', 'leaflet-search-form leaflet-bar');
    searchForm.setAttribute('autocomplete', 'off');
    searchForm.addEventListener('submit', this.search);

    // Create search input element
    var searchInput = L.DomUtil.create('input', 'leaflet-search-input', searchForm);
    searchInput.type = 'text';
    searchInput.placeholder = 'Search for a location';
    searchInput.style.width = '300px'; // Set width to 300px

    // Create search button element
    var searchButton = L.DomUtil.create('button', 'leaflet-search-button', searchForm);
    searchButton.type = 'submit';
    searchButton.innerHTML = 'Search an Address';

    return searchForm;
  },

  search: function (event) {
    // Prevent form from submitting and reloading the page
    event.preventDefault();

    // Get search query from input field
    var query = event.target.querySelector('.leaflet-search-input').value;

    // Geocode search query using Nominatim
    fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + encodeURIComponent(query))
      .then(response => response.json())
      .then(data => {
        // Get first search result and zoom to its location
        if (data.length > 0) {
          var result = data[0];
          var latlng = L.latLng(result.lat, result.lon);
          map.setView(latlng, 16);

          // Add a temporary marker at the search result location
        var marker = L.marker(latlng).addTo(map);
        setTimeout(function() {
          map.removeLayer(marker);
        }, 10000); // Remove the marker after 10 seconds
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
});

// Add custom search control to map
map.addControl(new searchControl());
*/

// Info control
var info = L.control({
  position: "bottomleft"
});

// Custom info hover control
info.onAdd = function(map) {
  this._div = L.DomUtil.create("div", "info-control");
  this.update();
  return this._div;
};
info.update = function(props) {
  this._div.innerHTML = "";
};
info.addTo(map);
$(".info-control").hide();

// Add the grayBasemap layer as the default
map.addLayer(grayBasemap);
map.addLayer(exampleDataLayer);

// Larger screens get expanded layer control
if (document.body.clientWidth <= 767) {
  isCollapsed = true;
} else {
  isCollapsed = false;
}
var baseLayers = {
  "ESRI World Gray": grayBasemap,
};
var overlayLayers = {
  "<span id='layer-name'>Properties</span>": exampleDataLayer
};

/*
var layerControl = L.control.layers(baseLayers, overlayLayers, {
  collapsed: isCollapsed
}).addTo(map);
*/

/*
// Filter table to only show features in current map bounds
map.on("moveend", function(e) {
  syncTable();
});
*/

map.on("click", function(e) {
  highlightLayer.clearLayers();
});

// Table formatter to make links clickable
function urlFormatter(value, row, index) {
  if (typeof value == "string" && (value.indexOf("http") === 0 || value.indexOf(
      "https") === 0)) {
    return "<a href='" + value + "' target='_blank'>" + value + "</a>";
  }
}

function buildFilters() {
  $("#query-builder").queryBuilder({
    allow_empty: true,
    filters: filters
  });
}

function applyFilter() {
  var query = "SELECT * FROM ?";
  var sql = $("#query-builder").queryBuilder("getSQL", false, false).sql;
  if (sql.length > 0) {
    query += " WHERE " + sql;
/*
Here, we'll want to restyle the vt layers so that it becomes transparent and noninteractive
*/
  }
  alasql(query, [geojson.features], function(features) {
    /*featureLayer.clearLayers();
    featureLayer.addData(features);*/
    syncLayer(features);
    syncTable(features);
  });
}

function buildTable() {
  $("#table").bootstrapTable({
    cache: false,
    height: $("#table-container").height(),
    undefinedText: "",
    striped: false,
    pagination: true,
    pageSize: 10,
    minimumCountColumns: 1,
    sortName: config.sortProperty,
    sortOrder: config.sortOrder,
    toolbar: "#toolbar",
    search: true,
    trimOnSearch: false,
    showColumns: true,
    showToggle: true,
    columns: table,
    onClickRow: function(row) {
      // do something!
    },
    onDblClickRow: function(row) {
      // do something!
    }
  });

 
  map.setView([39.9526, -75.1652], 13);


  $(window).resize(function() {
    $("#table").bootstrapTable("resetView", {
      height: $("#table-container").height()
    });
  });
}

function syncLayer(features) {
  var allFeatures = geojson.features;
  var filteredFeatures = features;
  var filteredFeatureIds = filteredFeatures.map(function(feature) {
    return feature.properties.opa_id;
  });
  allFeatures.map(function(feature) {
    var featureId = feature.properties.opa_id;
    if (filteredFeatureIds.indexOf(featureId) > -1) {
      exampleDataLayer.setFeatureStyle(feature.properties.opa_id, 
        featureStyle(feature.properties));
    } else {
      exampleDataLayer.setFeatureStyle(feature.properties.opa_id, {
        fillColor: "#ff0000",
        fillOpacity: 0,
        color: "#ff0000",
        weight: 1,
        opacity: 0,
        fill: false,
        interactive: false
      });
    }
  });
}

function syncTable(features) {
  tableFeatures = [];
  /* featureLayer.eachLayer(function(layer) {
    layer.feature.properties.leaflet_stamp = L.stamp(layer);
    if (map.hasLayer(featureLayer)) {
      if (map.getBounds().contains(layer.getBounds())) {
        tableFeatures.push(layer.feature.properties);
      }
    }
  });*/
  features.forEach(function(feature) {
    tableFeatures.push(feature.properties);
  });

  /*
  $("#table").bootstrapTable("destroy"); // Remove the existing table
  $("#table").bootstrapTable({ // Initialize a new table with pagination
    data: tableFeatures,
    pagination: true,
    pageSize: 10 // Set the number of rows per page
  });
*/

  $("#table").bootstrapTable("load", JSON.parse(JSON.stringify(tableFeatures)));
  
  var featureCount = $("#table").bootstrapTable("getData").length;
  if (featureCount == 1) {
    $("#feature-count").html($("#table").bootstrapTable("getData").length +
      " visible feature");
  } else {
    $("#feature-count").html($("#table").bootstrapTable("getData").length +
      " visible features");
  }
}

/*
function syncTable() {
  tableFeatures = [];

  geojson.features.forEach(function(feature) {
    tableFeatures.push(feature.properties);
  });

  $("#table").bootstrapTable("destroy"); // Remove the existing table
  $("#table").bootstrapTable({ // Initialize a new table with pagination
    data: tableFeatures,
    pagination: true,
    pageSize: 10 // Set the number of rows per page
  });

  var featureCount = $("#table").bootstrapTable("getData").length;
  if (featureCount == 1) {
    $("#feature-count").html($("#table").bootstrapTable("getData").length +
      " visible feature");
  } else {
    $("#feature-count").html($("#table").bootstrapTable("getData").length +
      " visible features");
  }
}
*/


function identifyFeature(id) {
  var featureProperties = featureLayer.getLayer(id).feature.properties;
  var content =
    "<table class='table table-striped table-bordered table-condensed'>";
  $.each(featureProperties, function(key, value) {
    if (!value) {
      value = "";
    }
    if (typeof value == "string" && (value.indexOf("http") === 0 || value.indexOf(
        "https") === 0)) {
      value = "<a href='" + value + "' target='_blank'>" + value + "</a>";
    }
    $.each(properties, function(index, property) {
      if (key == property.value) {
        if (property.info !== false) {
          content += "<tr><th>" + property.label + "</th><td>" + value +
            "</td></tr>";
        }
      }
    });
  });
  content += "<table>";
  $("#feature-info").html(content);
  $("#featureModal").modal("show");
}

function switchView(view) {
  if (view == "split") {
    $("#view").html("Split View");
    location.hash = "#split";
    $("#table-container").show();
    $("#table-container").css("height", "55%");
    $("#map-container").show();
    $("#map-container").css("height", "45%");
    $(window).resize();
    if (map) {
      map.invalidateSize();
    }
  } else if (view == "map") {
    $("#view").html("Map View");
    location.hash = "#map";
    $("#map-container").show();
    $("#map-container").css("height", "100%");
    $("#table-container").hide();
    if (map) {
      map.invalidateSize();
    }
  } else if (view == "table") {
    $("#view").html("Table View");
    location.hash = "#table";
    $("#table-container").show();
    $("#table-container").css("height", "100%");
    $("#map-container").hide();
    $(window).resize();
  }
}

$("[name='view']").click(function() {
  $(".in,.open").removeClass("in open");
  if (this.id === "map-graph") {
    switchView("split");
    return false;
  } else if (this.id === "map-only") {
    switchView("map");
    return false;
  } else if (this.id === "graph-only") {
    switchView("table");
    return false;
  }
});

$("#about-btn").click(function() {
  $("#aboutModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#filter-btn").click(function() {
  $("#filterModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#chart-btn").click(function() {
  $("#chartModal").modal("show");
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#view-sql-btn").click(function() {
  alert($("#query-builder").queryBuilder("getSQL", false, false).sql);
});

$("#apply-filter-btn").click(function() {
  applyFilter();
});

$("#reset-filter-btn").click(function() {
  $("#query-builder").queryBuilder("reset");
  applyFilter();
});

$("#extent-btn").click(function() {
  map.fitBounds(featureLayer.getBounds());
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#download-csv-btn").click(function() {
  $("#table").tableExport({
    type: "csv",
    ignoreColumn: [0],
    fileName: "data"
  });
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#download-excel-btn").click(function() {
  $("#table").tableExport({
    type: "excel",
    ignoreColumn: [0],
    fileName: "data"
  });
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#download-pdf-btn").click(function() {
  $("#table").tableExport({
    type: "pdf",
    ignoreColumn: [0],
    fileName: "data",
    jspdf: {
      format: "bestfit",
      margins: {
        left: 20,
        right: 10,
        top: 20,
        bottom: 20
      },
      autotable: {
        extendWidth: false,
        overflow: "linebreak"
      }
    }
  });
  $(".navbar-collapse.in").collapse("hide");
  return false;
});

$("#chartModal").on("shown.bs.modal", function(e) {
  drawCharts();
});

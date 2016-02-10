function initMakeCodeChange() {
    $('#makecode').change(function() {
        filterCriteriaByMake(global_vehicles, $(this).val().toLowerCase());
       	if (is_nottablet){$(".chosenselect").trigger("chosen:updated");}
    });
}
function initDealershipChange() {
    $('#dealership').change(function() {
        filterCriteriaByDealership(global_vehicles, $(this).val());
        if (is_nottablet){$(".chosenselect").trigger("chosen:updated");}
    });
}
$('#reset').click(function() {
    location.replace(location.pathname);
});

$('.vse-show-more').on('click', function(e) {
    var txt = $(this).text();
    if (txt == 'Advanced Search') {
        $('.vse-advanced-search').slideDown('slow');
        $(this).text('Basic Search');
        e.preventDefault();
    } else {
        $('.vse-advanced-search').slideUp('slow');
        $(this).text('Advanced Search');
        $('html, body').animate({
            scrollTop: $('#search_form').offset().top
        }, 'slow');
        e.preventDefault();
    }    
});

$('input[type="checkbox"][name="category[]"]').on('change', function() {
    var getArrVal = $('input[type="checkbox"][name="category[]"]:checked').map(function() {
        return this.value;
    }).toArray();
    if (!getArrVal.length) {
        $(this).prop("checked", true);
        sweetAlert("Whoops!", "You must tick at least one value", "warning");
        return false;
    };    
});

function initPrices() {
	var price = new Array();
	     
	$('select[name="FromPrice"] option').each(function() {
		price.push($(this).val());
	});
	
	var arr_len2 = price.length;
	
	$('select[name="FromPrice"]').on('change', function() {
		$('select[name="ToPrice"]').empty().append('');
		var sel = $(this).val(),
			index2 = price.indexOf(sel),
			last_opt2 = $(this).find('option:last-child').val(),
			last_opt2_txt = $(this).find('option:last-child').text();
		
		
		for (var i = index2 + 1; i < arr_len2; i++) {
			var item2 = $('select[name="FromPrice"] option').eq(i).text(),
				item_val = $('select[name="FromPrice"] option').eq(i).val();
			$('select[name="ToPrice"]').append('<option value="' + item_val + '">' + item2 + '</option>');
		}
		
		sel == last_opt2 && $('select[name="ToPrice"]').append('<option value="' + last_opt2 + '">' + last_opt2_txt + '</option>');
		
		$('select[name="ToPrice"]').append('<option value="">Max</option>');
	}); 
}
 
function initSearchButton(page_url) {
	$("#vse-search-btn").on("click", function(e) {
	    e.preventDefault();
        var category = [];
        $('input[name="category[]"]:checked').each(function(){
        	category.push($(this).val());
        });      
        
		var makecode = $.trim($('#makecode').val()),model = $.trim($('#Model').val()),colour = $.trim($('#Colour').val()),fromprice = $.trim($('#FromPrice').val()),
            toprice = $.trim($("#ToPrice").val()),year = $.trim($("#Year").val()),transmission = $.trim($('#Transmission').val()),
            fuel = $.trim($('#fuel').val()),body = $.trim($('#body').val()),stocknumber = $.trim($('#stocknumber').val()),
            dealership = $.trim($('#dealership option:selected').val()),dealershipID = $.trim($('#dealership option:selected').attr('id'));
	
		var x = page_url; 
	 
		if(stocknumber.length != 0) {
            if(category.length > 0) { x += "category=" + category + "&"; }
			if(stocknumber.length != 0) { x += "stocknumber=" + stocknumber + "&" }
		} else {
            if(category.length > 0) { x += "category=" + category + "&"; }
            if(dealership.length > 0) { x += "dealership=" + dealership + "&"; }
            if(dealershipID.length > 0) { x += "dealershipID=" + dealershipID + "&"; }
			if(makecode.length != 0) { x += "makecode=" + makecode + "&"; }
			if(model.length != 0) { x += "model=" + model + "&"; }
			if(colour.length != 0) { x += "colour=" + colour + "&"; }
			if(fromprice.length != 0) { x += "fromprice=" + fromprice + "&"; }
			if(toprice.length != 0) { x += "toprice=" + toprice + "&"; }
			if(year.length != 0) {x+="year=" + year + "&"; }
			if(transmission.length != 0) { x += "transmission=" + transmission + "&"; }
			if(fuel.length != 0) { x += "fueltype=" + fuel + "&"; }
			if(body.length != 0) { x += "body=" + body + "&"; }
		}
		if($.trim($('.sortingdata').val()).length != 0) {
			x+= "sortby=" + $('.sortingdata').val() + "&";
		}        
        window.location = global_loc + x.substring(x.length-1,0);        
	});
}

function initSortData() {    
    $('select[name="sortingdata"]').on('change', function(){
        var sel = $(this).find('option:selected').val();
        $('input[name="sortingdata"]').val(sel);
    });    
}

function getAvailableMakes(json,model_elem,sel) {	
	var result = "<option value=\"\" " + sel + ">Select all</option>";
	var a = [];
	for(b=0;b<json.items.length-1;b++) {
		a.push(json.items[b].makecode);
	}
	var c = $.distinct(a);
	c.sort();
	for(d=0;d<c.length;d++) {
		result+="<option value=\"" + c[d] + "\">" + c[d] + "</option>";
	}
	$(model_elem).html(result);
}

function getAvailableModels(json,model_elem,sel) {
	var result="<option value=\"\" " + sel + ">Select all</option>";
	var a=[];
    for(b=0;b<json.items.length;b++) {
        a.push(json.items[b].model);
	}
	var c = $.distinct(a);
	c.sort();
	for(d=0;d<c.length;d++) {
		result+="<option value=\"" + c[d] + "\">" + c[d] + "</option>";
	}
	$(model_elem).html(result);
}
 
function getModelsByMake(json,makecode,model_elem) {
	if($.trim(makecode) != "") {
		var result="<option value=\"\" " + sel + ">Select all</option>";
		var a=[];
		for(b=0;b<json.items.length;b++) {
			if(json.items[b].makecode == makecode) {
				a.push(json.items[b].model);
			}
		}
		var c = $.distinct(a);
		c.sort();
		for(d=0;d<c.length;d++) {
			result+="<option value=\"" + c[d] + "\">" + c[d] + "</option>";
		}
		$(model_elem).html(result);	
	} else {
		getAllModels(global_vehicles,"#Model");
	}
}

function getAvailableColours(json,model_elem,sel) {
	var result="<option value=\"\" " + sel + ">Select all</option>";
	var a=[];
	for(b=0;b<json.items.length;b++) {
		a.push(json.items[b].colour);
	}
	var c = $.distinct(a);
	c.sort();
	for(d=0;d<c.length;d++) {
		result+="<option value=\"" + c[d] + "\">" + c[d] + "</option>";
	}
	$(model_elem).html(result);
}

function getAvailableTransmission(json,model_elem,sel) {
	var result="<option value=\"\" " + sel + ">Select all</option>";
	var a=[];
	for(b=0;b<json.items.length;b++) {
		a.push(json.items[b].transmission);
	}
	var c = $.distinct(a);
	c.sort();
	for(d=0;d<c.length;d++) {
		result+="<option value=\"" + c[d] + "\">" + c[d] + "</option>";
	}
	$(model_elem).html(result);
}

function getAvailableFuels(json,model_elem,sel) {
	var result="<option value=\"\" " + sel + ">Select all</option>";
	var a=[];
	for(b=0;b<json.items.length;b++) {
		a.push(json.items[b].fuel);
	}
	var c = $.distinct(a);
	c.sort();
	for(d=0;d<c.length;d++) {
		result+="<option value=\"" + c[d] + "\">" + c[d] + "</option>";
	}
	$(model_elem).html(result);
}

function getAvailableBodies(json,model_elem,sel) {
	var result="<option value=\"\" " + sel + ">Select all</option>";
	var a=[];
	for(b=0;b<json.items.length;b++) {
		a.push(json.items[b].body);
	}
	var c = $.distinct(a);
	c.sort();
	for(d=0;d<c.length;d++) {
		result+="<option value=\"" + c[d] + "\">" + c[d] + "</option>";
	}
	$(model_elem).html(result);
}

function getAvailableStockNumbers(json,model_elem,sel) {
	var result="<option value=\"\" " + sel + ">Select all</option>";
	var a=[];
	for(b=0;b<json.items.length;b++) {
		a.push(json.items[b].stocknumber);
	}
	var c = $.distinct(a);
	c.sort();
	for(d=0;d<c.length;d++) {
		result+="<option value=\"" + c[d] + "\">" + c[d] + "</option>";
	}
	$(model_elem).html(result);
}

function filterCriteriaByDealership(json,dealership) {	
	if($.trim(dealership) != "") {
		//console.log("filter dealership: " + dealership);
		var make_result="<option value=\"\" " + sel + ">Select all</option>",model_result="<option value=\"\" " + sel + ">Select all</option>",
            colour_result="<option value=\"\" " + sel + ">Select all</option>",year_result= "<option value=\"\" " + sel + ">Select all</option>",
			transmission_result="<option value=\"\" " + sel + ">Select all</option>",fuel_result="<option value=\"\" " + sel + ">Select all</option>",
			body_result="<option value=\"\" " + sel + ">Select all</option>",stocknum_result="<option value=\"\" " + sel + ">Select all</option>",
			make=[],model=[],colour = [],year = [],transmission = [],fuel = [],body = [],stocknum = [],arr_selected= dealership.split(", ");
		               
        for(a=0;a<json.items.length;a++) {
            if ($.inArray(json.items[a].dealershipid.toString(), arr_selected) != -1){
                make.push(json.items[a].makecode),model.push(json.items[a].model),colour.push(json.items[a].colour);
                year.push(json.items[a].year),transmission.push(json.items[a].transmission),fuel.push(json.items[a].fuel);
                body.push(json.items[a].body),stocknum.push(json.items[a].stocknumber);
            }
		}
		var make_final = $.distinct(make),model_final = $.distinct(model),colour_final = $.distinct(colour),year_final = $.distinct(year),
			transmission_final = $.distinct(transmission),fuel_final = $.distinct(fuel),body_final = $.distinct(body),stocknum_final = $.distinct(stocknum);
		
		make_final.sort(),model_final.sort(),colour_final.sort(),year_final.sort(),transmission_final.sort(),fuel_final.sort(),body_final.sort(),stocknum_final.sort();
        
		for(b=0;b<make_final.length;b++)make_result+="<option value=\"" + make_final[b] + "\">" + make_final[b] + "</option>";
        for(b=0;b<model_final.length;b++)model_result+="<option value=\"" + model_final[b] + "\">" + model_final[b] + "</option>";
        for(b=0;b<colour_final.length;b++)colour_result+="<option value=\"" + colour_final[b] + "\">" + colour_final[b] + "</option>";
		for(b=0;b<year_final.length;b++)year_result+="<option value=\"" + year_final[b] + "\">" + year_final[b] + "</option>";
		for(b=0;b<transmission_final.length;b++)transmission_result+="<option value=\"" + transmission_final[b] + "\">" + transmission_final[b] + "</option>";
		for(b=0;b<fuel_final.length;b++)fuel_result+="<option value=\"" + fuel_final[b] + "\">" + fuel_final[b] + "</option>";
		for(b=0;b<body_final.length;b++)body_result+="<option value=\"" + body_final[b] + "\">" + body_final[b] + "</option>";
		for(b=0;b<stocknum_final.length;b++)stocknum_result+="<option value=\"" + stocknum_final[b] + "\">" + stocknum_final[b] + "</option>";
		
		$("#makecode").html(make_result),$("#Model").html(model_result),$("#Colour").html(colour_result),$("#Transmission").html(transmission_result),
		$("#fuel").html(fuel_result),$("#stocknumber").html(stocknum_result),$("#body").html(body_result),$("#Year").html(year_result);
        
	} else {
		getAvailableMakes(global_vehicles,"#makecode"),getAvailableModels(global_vehicles,"#Model"),
		getAvailableColours(global_vehicles,"#Colour"),getAvailableTransmission(global_vehicles,"#Transmission"),
		getAvailableFuels(global_vehicles,"#fuel"),getAvailableBodies(global_vehicles,"#body"),
		getAvailableStockNumbers(global_vehicles,"#stocknumber"),getYears(global_vehicles,"#Year");
	} 
}

function filterCriteriaByMake(json,make) {	
	if($.trim(make) != "") {
		//console.log("filter makecode: " + make);
		var model_result="<option value=\"\" " + sel + ">Select all</option>",colour_result="<option value=\"\" " + sel + ">Select all</option>",
			year_result= "<option value=\"\" " + sel + ">Select all</option>",transmission_result="<option value=\"\" " + sel + ">Select all</option>",
			fuel_result="<option value=\"\" " + sel + ">Select all</option>",body_result="<option value=\"\" " + sel + ">Select all</option>",
			stocknum_result="<option value=\"\" " + sel + ">Select all</option>",
			model=[],colour = [],year = [],transmission = [],fuel = [],body = [],stocknum = [];
		
        for(a=0;a<json.items.length;a++) {
            if(json.items[a].makecode == make) {
                model.push(json.items[a].model),colour.push(json.items[a].colour),year.push(json.items[a].year),
                transmission.push(json.items[a].transmission),fuel.push(json.items[a].fuel),body.push(json.items[a].body),
                stocknum.push(json.items[a].stocknumber);
            }
		}
		var model_final = $.distinct(model),colour_final = $.distinct(colour),year_final = $.distinct(year),transmission_final = $.distinct(transmission),
			fuel_final = $.distinct(fuel),body_final = $.distinct(body),stocknum_final = $.distinct(stocknum);
		
		model_final.sort(),colour_final.sort(),year_final.sort(),transmission_final.sort(),fuel_final.sort(),body_final.sort(),stocknum_final.sort();

		for(b=0;b<model_final.length;b++)model_result+="<option value=\"" + model_final[b] + "\">" + model_final[b] + "</option>";
		for(b=0;b<colour_final.length;b++)colour_result+="<option value=\"" + colour_final[b] + "\">" + colour_final[b] + "</option>";
		for(b=0;b<year_final.length;b++)year_result+="<option value=\"" + year_final[b] + "\">" + year_final[b] + "</option>";
		for(b=0;b<transmission_final.length;b++)transmission_result+="<option value=\"" + transmission_final[b] + "\">" + transmission_final[b] + "</option>";
		for(b=0;b<fuel_final.length;b++)fuel_result+="<option value=\"" + fuel_final[b] + "\">" + fuel_final[b] + "</option>";
		for(b=0;b<body_final.length;b++)body_result+="<option value=\"" + body_final[b] + "\">" + body_final[b] + "</option>";
		for(b=0;b<stocknum_final.length;b++)stocknum_result+="<option value=\"" + stocknum_final[b] + "\">" + stocknum_final[b] + "</option>";
		
		$("#Model").html(model_result),$("#Colour").html(colour_result),$("#Transmission").html(transmission_result),
		$("#fuel").html(fuel_result),$("#stocknumber").html(stocknum_result),$("#body").html(body_result),$("#Year").html(year_result);
	} else {
		getAvailableMakes(global_vehicles,"#makecode"),getAvailableModels(global_vehicles,"#Model"),
		getAvailableColours(global_vehicles,"#Colour"),getAvailableTransmission(global_vehicles,"#Transmission"),
		getAvailableFuels(global_vehicles,"#fuel"),getAvailableBodies(global_vehicles,"#body"),getAvailableStockNumbers(global_vehicles,"#stocknumber"),
		getYears(global_vehicles,"#Year");
	} 
}

function getYears(json,model_elem,sel) {
	var result = "<option value=\"\" " + sel + ">Select all</option>";
	var a = [];
	for(b=0;b<json.items.length;b++) a.push(json.items[b].year);
	var c = $.distinct(a);
	c.sort();
	for(d=0;d<c.length;d++) result+="<option value=\"" + c[d] + "\">" + c[d] + "</option>";
	$(model_elem).html(result);
}

function reinitialiseCategory() {
	  //console.log("Reinitialising category...");	
	  $('input[name="category[]"]').each(function() {
		var a = $.trim($(this).val());
		var b = gcat.toLowerCase().split(",");
		for(c=0;c<b.length;c++) {
			if($.trim(b[c].toLowerCase()) == a.toLowerCase()) $(this).attr('checked','true');
		}
	  });	  
}

function reinitialiseDealershipID() {
	  //console.log("Reinitialising dealerships...");	
	  $('#dealership option').each(function() {
		var a = $.trim($(this).attr('id'));
		var b = gdeaID.toLowerCase().split(",");
		for(c=0;c<b.length;c++) {
			if($.trim(b[c].toLowerCase()) == a.toLowerCase()) $(this).attr('selected','');
		}
	  });	  
    
}

function reinitialiseMake() {
	  //console.log("Reinitialising models...");	
	  $('#makecode option').each(function() {
		var a = $.trim($(this).attr('value'));
		var b = gmke.toLowerCase().split(",");
		for(c=0;c<b.length;c++) {
			if($.trim(b[c].toLowerCase()) == a.toLowerCase()) $(this).attr('selected','');
		}
	  });	  
}

function reinitialiseModel() {
	  //console.log("Reinitialising models...");	
	  $('#Model option').each(function() {
		var a = $.trim($(this).attr('value'));
		var b = gmod.toLowerCase().split(",");
		for(c=0;c<b.length;c++) {
			if($.trim(b[c].toLowerCase()) == a.toLowerCase()) $(this).attr('selected','');
		}
	  });	  
	  if(is_nottablet) {$('#Model').trigger("chosen:updated");}
}

function reinitialiseTransmission() {
	//console.log("Reinitialising transmissions...");
	$('#Transmission option').each(function() {
		var a = $.trim($(this).attr('value'));
		var b = gtrans.toLowerCase().split(",");
		for(c=0;c<b.length;c++) {
			if($.trim(b[c].toLowerCase()) == a.toLowerCase()) $(this).attr('selected','');
		}
	});
    if(is_nottablet) {$('#Transmission').trigger("chosen:updated");}
}

function reinitialiseColour() {
	//console.log("Reinitialising colours....");
	$('#Colour option').each(function() {
		var a = $.trim($(this).attr('value'));
		var b = gcol.toLowerCase().split(",");
		for(c=0;c<b.length;c++) {
			if($.trim(b[c].toLowerCase()) == a.toLowerCase()) $(this).attr('selected','');
		}
	});
    if(is_nottablet) {$('#Colour').trigger("chosen:updated");}
}

function reinitialiseYear() {
	//console.log("Reinitialising years...");
	$('#Year option').each(function(){
		var a = $.trim($(this).attr('value'));
		var b = gyr.toLowerCase().split(",");
		for(c=0;c<b.length;c++) {
			if($.trim(b[c].toLowerCase()) == a.toLowerCase()) $(this).attr('selected','');
		}
	});
    if(is_nottablet) {$('#Year').trigger("chosen:updated");}
}

function reinitialiseFuel() {
	//console.log("Reinitialising fuels...");
	$('#fuel option').each(function(){
		var a = $.trim($(this).attr('value'));
		var b = gfue.toLowerCase().split(",");
		for(c=0;c<b.length;c++) {
			if($.trim(b[c].toLowerCase()) == a.toLowerCase()) $(this).attr('selected','');
		}
	});
    if(is_nottablet) {$('#fuel').trigger("chosen:updated");}
}

function reinitialiseBody() {
	//console.log("Reinitialising bodies...");
	$('#body option').each(function(){
		var a = $.trim($(this).attr('value'));
		var b = gbod.toLowerCase().split(",");
		for(c=0;c<b.length;c++) {
			if($.trim(b[c].toLowerCase()) == a.toLowerCase()) $(this).attr('selected','');
		}
	});
    if(is_nottablet) {$('#body').trigger("chosen:updated");}
}

function reinitialiseStockNumbers() {
	//console.log("Reinitialising stock numbers...");
	$('#stocknumber option').each(function(){
		var a = $.trim($(this).attr('value'));
		var b = gstock.toLowerCase().split(",");
		for(c=0;c<b.length;c++) {
			if($.trim(b[c].toLowerCase()) == a.toLowerCase()) {
				
			}
		}
	});
    if(is_nottablet) {$('#stocknumber').trigger("chosen:updated");}
}

function isAdvanceSearch() {
	var ans = false;
	if(isyr || istra || isfu || isbod || isstock) {
		ans = true;
		$('.vse-advanced-search').attr('style','display: block;');
		$('.vse-show-more').html("Basic Search");
	}
	return ans;
}

$.extend({
    distinct : function(anArray) {
       var result = [];
       $.each(anArray, function(i,v){
           if ($.inArray(v, result) == -1) result.push(v);
       });
       return result;
    }
}); 

function scrollTo(selector) {
    $('html, body').animate({
        scrollTop: $(selector).offset().top
    }, 'slow');
}    

$(document).ready(function(){   
    if ( $('select#dealership').length )initDealershipChange();else initMakeCodeChange();
    getAvailableMakes(global_vehicles, "#makecode", sel);
    getAvailableModels(global_vehicles, "#Model", sel);
    getAvailableColours(global_vehicles, "#Colour", sel);
    getAvailableTransmission(global_vehicles, "#Transmission", sel);
    getAvailableFuels(global_vehicles, "#fuel", sel);
    getAvailableBodies(global_vehicles, "#body", sel);
    getAvailableStockNumbers(global_vehicles, "#stocknumber", sel);
    getYears(global_vehicles, "#Year", sel);
    initPrices();
    initSearchButton(global_thispage+"?");
    initSortData();
        
    $('.holder').on('click', function() { scrollTo('body'); });
    
    if (is_nottablet) {
        $(".chosenselect").chosen({
            max_selected_options: 5,
            width: "100%"
        });
    }
    $('.chosen-container .chosen-results').on('touchend', function(event) {
        event.stopPropagation();
        event.preventDefault();
        return;
    });

    $('input[name="category[]"]').each(function() {
        (gcat == '') && $(this).attr('checked', true);
    });
});
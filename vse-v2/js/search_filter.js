function filterSearch(_listitem) {
    //console.log(isstocknumber);
	var item_count = 0; 
    
	$(_listitem).each(function() {
		var ctrx = 1;
		if(!isstocknumber) {
			var itemcategory = $(this).attr('data-category'),
                itemmakecode = $(this).attr('data-makecode'),
                itemmodel = $(this).attr('data-model'),
                itemcolour = $(this).attr('data-colour'),
                itemtransmission = $(this).attr('data-transmission'),
                itemfueltype = $(this).attr('data-fueltype'),
                itembody = $(this).attr('data-body'),
                itemprice = parseInt($(this).attr('data-price')),
                itemyear = parseInt($(this).attr('data-year'));
            
            if (iscategory) {
				var split_category = global_category.toLowerCase().split(",");
				$('input[name="category[]"][value="'+split_category+'"]').attr('checked',true);
                
				var ctr_category = 0;
				for(var i1 = 0;i1 < split_category.length; i1++) { 
					if(itemcategory == split_category[i1]) { ctr_category++;}
				}
				if(ctr_category > 0) { ctrx=1; } else { ctrx=0; }
			}
			
			if (ismakecode) {
				var split_make = global_makecode.toLowerCase().split(",");
				$('#makecode').val(split_make);
				
				var ctr_make = 0;
				for(var i1 = 0;i1 < split_make.length; i1++) { 
					if(itemmakecode == split_make[i1]) { ctr_make++;}
				}
				if(ctr_make > 0) { ctrx=1; } else { ctrx=0; }
			}
			if (ismodel != false) {
				if(ctrx==1) {
					var split_model = global_model.toLowerCase().split(",");
                    if(is_nottablet) {$('#Model').val(split_model).trigger("chosen:updated");} else {$('#Model').val(split_model); }
					var ctr_model = 0;
					for(i2 = 0; i2 < split_model.length;i2++) {
						if(itemmodel == split_model[i2]) { ctr_model++; }
					}
					if(ctr_model > 0) { ctrx=1; } else { ctrx=0; }
				}
			}
			if (iscolour != false) {
				if(ctrx==1) {
					var split_colour = global_colour.toLowerCase().split(",");
					var ctr_colour = 0;
					for(i3 = 0; i3 < split_colour.length; i3++) { if(itemcolour.toLowerCase() == split_colour[i3]) { ctr_colour++; } }
					if(ctr_colour > 0) { 
						ctrx=1; 
					} else {
						ctrx=0; 
					}
				} 
			}
			if(istransmission) {
				if(ctrx == 1) {
					var split_transmission = global_transmission.toLowerCase().split(",");
                    if(is_nottablet) {$('#transmission').val(split_transmission).trigger("chosen:updated");} else {$('#transmission').val(split_transmission); }
					var ctr_transmission = 0;
					for(i4=0;i4<split_transmission.length;i4++) { 
						if(itemtransmission == split_transmission[i4]) { ctr_transmission++; }
						console.log(itemtransmission + "|" + split_transmission[i4])
					}
					if (ctr_transmission > 0) { ctrx=1; } else { ctrx=0; }
				}
			}
			if(isfueltype != false) {
				if(ctrx == 1) {
					var split_fuel = global_fuel.toLowerCase().split(",");
                    if(is_nottablet) {$('#fuel').val(split_fuel).trigger("chosen:updated");} else {$('#fuel').val(split_fuel); }
					var ctr_fuel = 0;
					for(i5=0;i5<split_fuel.length;i5++) {
						if(itemfueltype == split_fuel[i5]) { ctr_fuel++; }
					}
					if(ctr_fuel > 0) { ctrx=1 } else { ctrx=0; }
				}
			}
			if(isbody != false) {
				if(ctrx==1) {
					var split_body = global_body.toLowerCase().split(",");
                    if(is_nottablet) {$('#body').val(split_body).trigger("chosen:updated");} else {$('#body').val(split_body); }
					var ctr_body = 0;
					for(i6=0;i6<split_body.length;i6++) {
						if(itembody == split_body[i6]) { ctr_body++; }
					}
					if(ctr_body > 0) { ctrx=1; } else { ctrx=0;}
				}
			}
			if(isyear) {
				if(ctrx==1) {
					var split_years = global_year.split(",");
                    if(is_nottablet) {$('#Year').val(split_years).trigger("chosen:updated");} else {$('#Year').val(split_years); }
					var ctr_years = 0;
					for(i7=0;i7<split_years.length;i7++) {
						if(parseInt(itemyear) == parseInt(split_years[i7])) { ctr_years++; } 
					}
					if(ctr_years > 0) { ctrx=1; } else { ctrx=0; }
				}
			}
			$('#FromPrice option[value="' + global_fromprice + '"]').attr('selected', 'selected');
			$('#ToPrice option[value="' + global_toprice + '"]').attr('selected', 'selected');
			
			if(ctrx == 1) {  if((itemprice >= global_fromprice) && (itemprice <= global_toprice)) { ctrx = 1; } else { ctrx = 0; } }
		} else { 
            var split_stocknumber = global_stocknumber.split(",");
            var itemstocknumber = $(this).attr('data-stocknumber').toLowerCase();
            var ctr_stocknumber = 0;
            for(is=0;is<split_stocknumber.length;is++) {
                if(itemstocknumber == split_stocknumber[is]) { ctr_stocknumber++; }
            }
            
            if(ctr_stocknumber > 0) { ctrx=1; } else { ctrx=0; }
            
            
            if(is_nottablet) {$('#stocknumber').val(split_stocknumber).trigger("chosen:updated");} else {$('#stocknumber').val(split_stocknumber); }
			
		}
		if(ctrx == 0) {
			$(this).remove();
		} else {
			item_count++;
		}
		
		$(".result-show").html("Showing " + item_count + " Result(s)");
        
        
        
	});
    
    if (item_count <= 20){$('.holder').hide();}else{$('.holder').show();}
	
	if(issortby) {
		$("#sortingdata option[value='" + global_sortby + "']").attr('selected', 'selected');
		
		switch (global_sortby) {
			case 'pricelh': {
				$('.instock-cars').sort(function(a, b) {
					return $(a).data('price') - $(b).data('price');
				}).each(function(_, container) {
					$(container).parent().append(container);
				});
				break;
			}
				
			case 'pricehl': {
				$('.instock-cars').sort(function(a, b) {
					return $(b).data('price') - $(a).data('price');
				}).each(function(_, container) {
					$(container).parent().append(container);
				});
				break;
			}
			   case 'yrl': {
				   $('.instock-cars').sort(function (a, b) {
						return $(a).data('price') - $(b).data('price');
						}).each(function (_, container) {
							 $(container).parent().append(container);
					});
					break; 
			  }
			  case 'yrh': {
				  $('.instock-cars').sort(function (a, b) {
					return $(b).data('price') - $(a).data('price');
					}).each(function (_, container) {
						 $(container).parent().append(container);
				});
				break;
			  }
			  default: { break; }
		}	
	}
	
	isAdvanceSearch();
	if(ismakecode) { $('#makecode').trigger('change'); }
    if(iscategory) { reinitialiseCategory(); }
	
	if(ismodel) { reinitialiseModel(); }
	if(iscolour) { reinitialiseColour(); }
	if(isyear) { reinitialiseYear(); }
	if(istransmission) { reinitialiseTransmission(); }
	if(isfueltype) { reinitialiseFuel(); }
	if(isbody) { reinitialiseBody(); }
	if(isstocknumber) { reinitialiseStockNumbers(); }
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
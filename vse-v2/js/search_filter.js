function filterSearch(_items) {
    //console.log(isstocknumber);
	var icount = 0; 
    
	$(_items).each(function() {
		var cx = 1;
		if(!isstocknumber) {
			var icategory = $(this).attr('data-category'),
                imkcode = $(this).attr('data-makecode'),
                imodel = $(this).attr('data-model'),
                icolour = $(this).attr('data-colour'),
                itransm = $(this).attr('data-transmission'),
                iftype = $(this).attr('data-fueltype'),
                ibody = $(this).attr('data-body'),
                iprice = parseInt($(this).attr('data-price')),
                iyear = parseInt($(this).attr('data-year'));
            
            if (iscategory) {
				var st_cat = global_category.toLowerCase().split(",");
				$('input[name="category[]"][value="'+st_cat+'"]').attr('checked',true);
                
				var ctr_category = 0;
				for(var i1 = 0;i1 < st_cat.length; i1++) { 
					if(icategory == st_cat[i1]) { ctr_category++;}
				}
				if(ctr_category > 0) { cx=1; } else { cx=0; }
			}
			
			if (ismakecode) {
				var st_make = global_makecode.toLowerCase().split(",");
				$('#makecode').val(st_make);
				
				var ctr_make = 0;
				for(var i1 = 0;i1 < st_make.length; i1++) { 
					if(imkcode == st_make[i1]) { ctr_make++;}
				}
				if(ctr_make > 0) { cx=1; } else { cx=0; }
			}
			if (ismodel != false) {
				if(cx==1) {
					var st_model = global_model.toLowerCase().split(",");
                    if(is_nottablet) {$('#Model').val(st_model).trigger("chosen:updated");} else {$('#Model').val(st_model); }
					var ctr_model = 0;
					for(i2 = 0; i2 < st_model.length;i2++) {
						if(imodel == st_model[i2]) { ctr_model++; }
					}
					if(ctr_model > 0) { cx=1; } else { cx=0; }
				}
			}
			if (iscolour != false) {
				if(cx==1) {
					var st_colour = global_colour.toLowerCase().split(",");
					var ctr_colour = 0;
					for(i3 = 0; i3 < st_colour.length; i3++) { if(icolour.toLowerCase() == st_colour[i3]) { ctr_colour++; } }
					if(ctr_colour > 0) { 
						cx=1; 
					} else {
						cx=0; 
					}
				} 
			}
			if(istransmission) {
				if(cx == 1) {
					var st_transm = global_transmission.toLowerCase().split(",");
                    if(is_nottablet) {$('#transmission').val(st_transm).trigger("chosen:updated");} else {$('#transmission').val(st_transm); }
					var ctr_transmission = 0;
					for(i4=0;i4<st_transm.length;i4++) { 
						if(itransm == st_transm[i4]) { ctr_transmission++; }
						console.log(itransm + "|" + st_transm[i4])
					}
					if (ctr_transmission > 0) { cx=1; } else { cx=0; }
				}
			}
			if(isfueltype != false) {
				if(cx == 1) {
					var st_fuel = global_fuel.toLowerCase().split(",");
                    if(is_nottablet) {$('#fuel').val(st_fuel).trigger("chosen:updated");} else {$('#fuel').val(st_fuel); }
					var ctr_fuel = 0;
					for(i5=0;i5<st_fuel.length;i5++) {
						if(iftype == st_fuel[i5]) { ctr_fuel++; }
					}
					if(ctr_fuel > 0) { cx=1 } else { cx=0; }
				}
			}
			if(isbody != false) {
				if(cx==1) {
					var st_body = global_body.toLowerCase().split(",");
                    if(is_nottablet) {$('#body').val(st_body).trigger("chosen:updated");} else {$('#body').val(st_body); }
					var ctr_body = 0;
					for(i6=0;i6<st_body.length;i6++) {
						if(ibody == st_body[i6]) { ctr_body++; }
					}
					if(ctr_body > 0) { cx=1; } else { cx=0;}
				}
			}
			if(isyear) {
				if(cx==1) {
					var st_years = global_year.split(",");
                    if(is_nottablet) {$('#Year').val(st_years).trigger("chosen:updated");} else {$('#Year').val(st_years); }
					var ctr_years = 0;
					for(i7=0;i7<st_years.length;i7++) {
						if(parseInt(iyear) == parseInt(st_years[i7])) { ctr_years++; } 
					}
					if(ctr_years > 0) { cx=1; } else { cx=0; }
				}
			}
			$('#FromPrice option[value="' + global_fromprice + '"]').attr('selected', 'selected');
			$('#ToPrice option[value="' + global_toprice + '"]').attr('selected', 'selected');
			
			if(cx == 1) {  if((iprice >= global_fromprice) && (iprice <= global_toprice)) { cx = 1; } else { cx = 0; } }
		} else { 
            var st_stocknum = global_stocknumber.split(",");
            var istocknum = $(this).attr('data-stocknumber').toLowerCase();
            var ctr_stocknumber = 0;
            for(is=0;is<st_stocknum.length;is++) {
                if(istocknum == st_stocknum[is]) { ctr_stocknumber++; }
            }
            
            if(ctr_stocknumber > 0) { cx=1; } else { cx=0; }
            
            
            if(is_nottablet) {$('#stocknumber').val(st_stocknum).trigger("chosen:updated");} else {$('#stocknumber').val(st_stocknum); }
			
		}
		if(cx == 0) {
			$(this).remove();
		} else {
			icount++;
		}
		
		$(".result-show").html("Showing " + icount + " Result(s)");
        
        
        
	});
    
    if (icount <= 20){$('.holder').hide();}else{$('.holder').show();}
	
	if(issortby) {
		$(".sortingdata option[value='" + global_sortby + "']").attr('selected', 'selected');
        $("input[name='sortingdata']").val(global_sortby);
		
		switch (global_sortby) {
			case 'pricelh': {
				$('.vse-item').sort(function(a, b) {
					return $(a).data('price') - $(b).data('price');
				}).each(function(_, container) {
					$(container).parent().append(container);
				});
				break;
			}
				
			case 'pricehl': {
				$('.vse-item').sort(function(a, b) {
					return $(b).data('price') - $(a).data('price');
				}).each(function(_, container) {
					$(container).parent().append(container);
				});
				break;
			}
			   case 'yrl': {
				   $('.vse-item').sort(function (a, b) {
						return $(a).data('year') - $(b).data('year');
						}).each(function (_, container) {
							 $(container).parent().append(container);
					});
					break; 
			  }
			  case 'yrh': {
				  $('.vse-item').sort(function (a, b) {
					return $(b).data('year') - $(a).data('year');
					}).each(function (_, container) {
						 $(container).parent().append(container);
				});
				break;
			  }
			  default: { break; }
		}	
        
                console.log(global_sortby);
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
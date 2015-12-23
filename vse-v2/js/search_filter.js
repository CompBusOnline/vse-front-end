function filterSearch(_listitem) {
	var item_count = 0;
	$(_listitem).each(function() {
		var ctrx = 1;
		if(!isstocknumber) {
			//console.log("- verifying search criterias...")
			var itemmakecode = $(this).attr('data-makecode').toLowerCase();
			var itemmodel = $(this).attr('data-model').toLowerCase();
			var itemcolour = $(this).attr('data-colour').toLowerCase();
			var itemtransmission = $(this).attr('data-transmission').toLowerCase();
			var itemfueltype = $(this).attr('data-fueltype').toLowerCase();
			var itembody = $(this).attr('data-body').toLowerCase();
			var itemcylinders = $(this).attr('data-cylinders');
			var itemdoorcount = $(this).attr('data-doorcount');
			var itemenginecapacity = $(this).attr('data-enginecapacity');
			var itemprice = parseInt($(this).attr('data-price'));
			var itemyear = parseInt($(this).attr('data-year'));
			var itemkm = parseInt($(this).attr('data-km')); 
			
			if (ismakecode) {
				//console.log("- checking makecodes...");
				var split_make = global_makecode.toLowerCase().split(",");
				var ctr_make = 0;
				for(var i1 = 0;i1 < split_make.length; i1++) { 
					if(itemmakecode == split_make[i1]) { ctr_make++; }
				}
				if(ctr_make > 0) { ctrx=1; } else { ctrx=0; }
			}
			if (ismodel != false) {
				//console.log("- checking models...");
				if(ctrx==1) {
					var split_model = global_model.toLowerCase().split(",");
					$('#Model').val(split_model).trigger("chosen:updated");
					var ctr_model = 0;
					for(i2 = 0; i2 < split_model.length;i2++) {
						if(itemmodel == split_model[i2]) { ctr_model++; }
					}
					if(ctr_model > 0) { ctrx=1; } else { ctrx=0; }
				}
			}
			if (iscolour != false) {
				//console.log("- checking colors...");
				if(ctrx==1) {
					var split_colour = global_colour.toLowerCase().split(",");
					$('#Colour').val(split_colour).trigger("chosen:updated");
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
				//console.log("- checking transmissions...");
				if(ctrx == 1) {
					var split_transmission = global_transmission.toLowerCase().split(",");
					$('#sidebar-wrapper .advance-search').attr('style','display: block;');
					$('#sidebar-wrapper .show-more').html("Basic Search");
					$('#transmission').val(split_transmission).trigger("chosen:updated");
					var ctr_transmission = 0;
					for(i4=0;i4<split_transmission.length;i4++) { 
						if(itemtransmission == split_transmission[i4]) { ctr_transmission++; }
						console.log(itemtransmission + "|" + split_transmission[i4])
					}
					if (ctr_transmission > 0) { ctrx=1; } else { ctrx=0; }
				}
			}
			if(isfueltype != false) {
				//console.log("- checking fuel types...");
				if(ctrx == 1) {
					var split_fuel = global_fuel.toLowerCase().split(",");
					$('#sidebar-wrapper .advance-search').attr('style','display: block;');
					$('#sidebar-wrapper .show-more').html("Basic Search");
					$('#fuel').val(split_fuel).trigger("chosen:updated");
					var ctr_fuel = 0;
					for(i5=0;i5<split_fuel.length;i5++) {
						if(itemfueltype == split_fuel[i5]) { ctr_fuel++; }
					}
					if(ctr_fuel > 0) { ctrx=1 } else { ctrx=0; }
				}
			}
			if(isbody != false) {
				//console.log("- checking body...");
				if(ctrx==1) {
					var split_body = global_body.toLowerCase().split(",");
					$('#sidebar-wrapper .advance-search').attr('style','display: block;');
					$('#sidebar-wrapper .show-more').html("Basic Search");
					$('#body').val(split_body).trigger("chosen:updated");
					var ctr_body = 0;
					for(i6=0;i6<split_body.length;i6++) {
						if(itembody == split_body[i6]) { ctr_body++; }
					}
					if(ctr_body > 0) { ctrx=1; } else { ctrx=0;}
				}
			}
			if(iscylinders != false) {
				//console.log("- checking cylinders...");
				if(ctrx==1) {
					var split_cylinders = global_cylinders.split(",");
					$('#sidebar-wrapper .advance-search').attr('style','display: block;');
					$('#sidebar-wrapper .show-more').html("Basic Search");
					$('#cylinders').val(split_cylinders).trigger("chosen:updated");
					var ctr_cylinders = 0;
					for(i7=0;i7<split_cylinders.length;i7++) {
						if(parseInt(itemcylinders) == parseInt(split_cylinders[i7])) { ctr_cylinders++; } 
					}
					if(ctr_cylinders > 0) { ctrx=1; } else { ctrx=0; }
				}
			}
			if(isdoorcount != false) {
				//console.log("- checking door count...");
				if(ctrx==1) {
					var split_doorcount = global_doorcount.split(",");
					$('#sidebar-wrapper .advance-search').attr('style','display: block;');
					$('#sidebar-wrapper .show-more').html("Basic Search");
					$('#doorcount').val(split_doorcount).trigger("chosen:updated");
					var ctr_doorcount = 0;
					for(i8=0;i8<split_cylinders.length;i8++) {
						if(parseInt(itemdoorcount) == parseInt(split_doorcount[i8])) { ctr_doorcount++; } 
					}
					if(ctr_doorcount > 0) { ctrx=1; } else { ctrx=0; }
				}
			}
			if(isenginecapacity != false) {
				//console.log("- checking engine capacity...");
				if(ctrx==1) {
					var split_enginecapacity = global_enginecapacity.split(",");
					$('#enginecapacity').val(split_enginecapacity).trigger("chosen:updated");
					$('#sidebar-wrapper .advance-search').attr('style','display: block;');
					$('#sidebar-wrapper .show-more').html("Basic Search");
					//show-more
					var ctr_enginecapacity = 0;
					for(i9=0;i9<split_cylinders.length;i9++) {
						if(parseFloat(itemenginecapacity) == parseFloat(split_enginecapacity[i7])) { ctr_enginecapacity++; } 
					}
					if(ctr_enginecapacity > 0) { ctrx=1; } else {ctrx=0;}
				}
			}
			if(isfromyear || istoyear) {
				$('#sidebar-wrapper .advance-search').attr('style','display: block;');
				$('#sidebar-wrapper .show-more').html("Basic Search");
			}
			$("#FromPrice option[value='" + global_fromprice + "']").attr('selected', 'selected');
			$("#ToPrice option[value='" + global_toprice + "']").attr('selected', 'selected');
			
			$("#FromYear option[value='" + global_fromyear + "']").attr('selected', 'selected');
			$("#ToYear option[value='" + global_toyear + "']").attr('selected', 'selected');
			//console.log(global_fromyear);
			//console.log(global_toyear);
			if(ctrx == 1) {  if((itemprice >= global_fromprice) && (itemprice <= global_toprice)) { ctrx = 1; } else { ctrx = 0; } }
			if(ctrx == 1) {  if((itemyear >= global_fromyear) && (itemyear <= global_toyear)) {  ctrx = 1; } else { ctrx = 0; } }
			if(ctrx == 1) {  if((itemkm >= global_fromkm) && (itemkm <= global_tokm)) { ctrx = 1; } else { ctrx = 0; } }
			
		} else {
			var split_stocknumber = global_stocknumber.split(",");
			$('#stocknumber').val(split_stocknumber).trigger("chosen:updated");
			$('#sidebar-wrapper .advance-search').attr('style','display: block;');
			$('#sidebar-wrapper .show-more').html("Basic Search");
			//console.log("- verifying stock numbers...")
		}
		if(ctrx == 0) {
			$(this).remove();
		} else {
			item_count++;
		}
		
		$(".result-show").html("Showing " + item_count + " Result(s)");
        
	});
	
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
    
    
    if (item_count <= 24){$('.holder').hide();}else{$('.holder').fadeIn("slow");}
}
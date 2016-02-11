function filterSearch(_i) {
	var cnt=0,cx=1; 
	$(_i).each(function() {		
		if(!isstock) {
			var icat = $(this).attr('data-category'),imke = $(this).attr('data-makecode'),imod = $(this).attr('data-model'),
                icol = $(this).attr('data-colour'),itra = $(this).attr('data-transmission'),ifu = $(this).attr('data-fueltype'),
                ibod = $(this).attr('data-body'),ipri = parseInt($(this).attr('data-price')),iyr = parseInt($(this).attr('data-year')),
                idea = $(this).attr('data-dealership');
            
            if (iscat) {
				var st_cat = gcat.toLowerCase().split(",");
				$('input[name="category[]"][value="'+st_cat+'"]').attr('checked',true);
				var ctr_cat = 0;
				for(var i1 = 0;i1 < st_cat.length; i1++) if(icat == st_cat[i1]) { ctr_cat++;}
				cx = (ctr_cat > 0) ? 1 : 0;
			}            
            if (isdea) {
            	cx = setMenuVal(gdea,'dealership',idea);
			}			
			if (ismke) {
				cx = setMenuVal(gmke,'makecode',imke);
			}
			if (ismod != false) {
				if(cx==1) cx = setChosenVal(gmod,'Model',imod);
			}
			if (iscol != false) {
				if(cx==1) cx = setChosenVal(gcol,'Colour',icol);
			}
			if(istra) {
				if(cx == 1) cx = setChosenVal(gtrans,'transmission',itra);
			}
			if(isfu != false) {
				if(cx == 1) cx = setChosenVal(gfue,'fuel',ifu);
			}
			if(isbod != false) {
				if(cx==1) cx = setChosenVal(gbod,'body',ibod);
			}
			if(isyr) {
				if(cx==1) cx = setChosenVal(gyr,'Year',parseInt(iyr));
			}
			$('#FromPrice option[value="' + gfpri + '"]').attr('selected', 'selected');
			$('#ToPrice option[value="' + gtpri + '"]').attr('selected', 'selected');
			
			if(cx == 1) {  if((ipri >= gfpri) && (ipri <= gtpri)) { cx = 1; } else { cx = 0; } }
		} else { 
			var istock = $(this).attr('data-stocknumber').toLowerCase();
			cx = setChosenVal(gstock,'stocknumber',istock);
		}
        (cx == 0) ? $(this).remove() : cnt++;

		$(".result-show").html("Showing " + cnt + " Result(s)");
	});
    
    cnt<=24?$(".holder").hide():$(".holder").show();
	
	if(issort) {
		$(".sortingdata option[value='" + gsort + "']").attr('selected', 'selected');
        $("input[name='sortingdata']").val(gsort);
		
		switch (gsort) {
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
    }else{
        $('.vse-item').sort(function(a, b) {
            return $(b).data('price') - $(a).data('price');
        }).each(function(_, container) {
            $(container).parent().append(container);
        });
    }
	
	isAdvanceSearch();
    if ( $('select#dealership').length ){
        if(isdea){$('#dealership').trigger('change');}
        ismke&&reinitialiseMake();
    }        
    else{
    	isdea&&reinitialiseDealershipID();
        if(ismke) { $('#makecode').trigger('change'); }
    }
    iscat&&reinitialiseCategory();
    ismod&&reinitialiseModel();
    iscol&&reinitialiseColour();
    isyr&&reinitialiseYear();
    istra&&reinitialiseTransmission();
    isfu&&reinitialiseFuel();
    isbod&&reinitialiseBody();
    isstock&&reinitialiseStockNumbers();
}
/*end filter search*/
function setChosenVal(global_var,selector_id,data_var){
	var st = global_var.toLowerCase().split(",");
        if(is_nottablet) {$('#'+selector_id).val(st).trigger("chosen:updated");} else {$('#'+selector_id).val(st); }
		var c = 0;
		for(j = 0; j < st.length;j++) if(data_var == st[j]) { c++;}
		return a=(c>0)?1:0;		
}
function setMenuVal(global_var,selector_id,data_var){
	var st = global_var.toLowerCase().split(",");                
		$('select#'+selector_id).val(st);        
		var c= 0;
		for(var j = 0;j < st.length; j++) if(data_var == st[j]) {c++;}
		return a=(c>0)?1:0;
}
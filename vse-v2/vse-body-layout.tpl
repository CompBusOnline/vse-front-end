{% if globals.visitor.deviceClass == "tablet" -%}{% assign thumbnail = "?Action=thumbnail&Width=272&Height=181&algorithm=fill_proportional" -%}
{% elsif globals.visitor.deviceClass == "phone" -%}{% assign thumbnail = "?Action=thumbnail&Width=300" -%}
{% elsif globals.visitor.deviceClass == "desktop" -%}{% assign thumbnail = "?Action=thumbnail&Width=267&Height=180&algorithm=fill_proportional" -%}
{% else -%}{% assign thumbnail = "" -%}{% endif -%}{module_json,json="/_System/apps/cbo-vehicle-search-engine/_config/vse.json" collection="settings"}
<script>var dimensions = {platform:'website', category:'{{x.Category}}', action:'impression', stocknumber:'{{x.StockNumber}}'};</script>
{% assign DataPrice = 0 -%}{% if x.DriveAwayPrice != 0 -%}{% assign DataPrice = x.DriveAwayPrice -%}{% else -%}{% assign DataPrice = x.Price -%}{% endif -%}
<div class="large-4 medium-6 small-12 columns vse-item" id="vehicle_{{x.StockNumber}}" data-stocknumber="{{x.StockNumber}}" data-name="{{x.VehicleName|downcase}}" data-category="{{x.Category|downcase}}" data-status="{{x.Status|downcase}}" data-makecode="{{x.MakeCode|downcase}}" data-model="{{x.Model|downcase}}" data-colour="{{x.Colour|downcase}}" data-transmission="{{x.Transmission|downcase}}" data-fueltype="{{x.FuelType|downcase}}" data-body="{{x.Body|downcase}}" data-price="{{DataPrice}}" data-year="{{x.Year}}">
    <div class="vse-full-border">  
        <div class="vse-image-container">
            <a href="{{x.Url}}"><img alt="{{x.VehicleName}}" data-original="/files/photos/{{x.StockNumber}}-1.jpg{{thumbnail}}&time={{globals.site.dateNow | date:'ffff'}}" class="lazy vse-image" src="/_System/Includes/vse-v2/images/vse-placeholder.jpg{{thumbnail}}" /></a>
        </div>        
        <div class="small-12 columns vse-details1-container text-right">
            <h4 class="vse-vehiclename">{{x.Year}} {{x.VehicleName}}</h4>            
            <div class="vse-modeldescription">{{x.ModelDescription}}</div>
        </div>
        <div class="clearfix"></div><hr/>        
        <div class="small-12 columns vse-details2-container text-right{% if {{settings.enable_weeklypayment}} == 'true' and {{DataPrice}} != '0' %} wp-enable{%endif-%}">
            <h4 class="vse-price">{% if {{DataPrice}} != '0' %}${{DataPrice}}{% else %}POA{% endif %}</h4> 
            {% if {{settings.enable_weeklypayment}} == 'true' and {{DataPrice}} != '0' %}<div><span>Weekly Payments of </span><h5 class="vse-weekly-price">0</h5></div>{% endif %}
            {% if {{x.Highlight}} != ''%}<div class="vse-highlight"><i class="fa fa-star yellow"></i> {{x.Highlight}}</div>{% endif %}
            <div class="vse-other-details">
                {% if x.Transmission != ''%}<div class="row">
                    <div class="large-7 medium-7 small-6 columns vse-datalabel vse-bold">&gt; Transmission:</div>
                    <div class="large-5 medium-5 small-6 columns vse-datavalue">{{x.Transmission}}</div>
                </div>{% endif- %}
                {% if x.FuelType != ''%}<div class="row">
                    <div class="large-7 medium-7 small-6 columns vse-datalabel vse-bold">&gt; Fuel:</div>
                    <div class="large-5 medium-5 small-6 columns vse-datavalue">{{x.FuelType}}</div>
                </div>{% endif- %}
                {% if x.Kilometres != ''%}<div class="row">
                    <div class="large-7 medium-7 small-6 columns vse-datalabel vse-bold">&gt; Odometer:</div>
                    <div class="large-5 medium-5 small-6 columns vse-datavalue comma">{{x.Kilometres}} km</div>
                </div>{% endif- %}
                {% if x.StockNumber != ''%}<div class="row">
                    <div class="large-7 medium-7 small-6 columns vse-datalabel vse-bold">&gt; Stock Number:</div>
                    <div class="large-5 medium-5 small-6 columns vse-datavalue ucase">{{x.StockNumber}}</div>
                </div>{% endif- %}
            </div>            
        </div>
        <div class="clearfix"></div>              
        <div class="small-12 vse-button-container text-center">
            <a class="vse-button1" href="{{x.Url}}">See Vehicle Details <b><span class="fa fa-angle-right bold" style="color:inherit"></span></b></a>
        </div>       
    </div>
</div>
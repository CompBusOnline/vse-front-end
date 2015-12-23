{% capture ctr -%}{{ctr | plus: 1}}{% endcapture -%}
{% if globals.visitor.deviceClass == "tablet" -%}
	{% assign thumbnail = "?Action=thumbnail&Width=200" -%}
{% elsif globals.visitor.deviceClass == "phone" -%}
	{% assign thumbnail = "?Action=thumbnail&Width=180" -%}
{% elsif globals.visitor.deviceClass == "desktop" -%}
	{% assign thumbnail = "?Action=thumbnail&Width=272" -%}
{% else -%}
	{% assign thumbnail = "" -%}
{% endif -%}    

<script>var dimensions = {platform:'website', category:'{{x.Category}}', action:'impression', stocknumber:'{{x.StockNumber}}'};</script>
{% assign DataPrice = 0 -%}{% if x.DriveAwayPrice != 0 -%}{% assign DataPrice = x.DriveAwayPrice -%}
{% else -%}{% assign DataPrice = x.Price -%}{% endif -%}
<div class="large-4 medium-6 small-12 columns vse-item" id="vehicle_{{x.StockNumber}}" data-stocknumber="{{x.StockNumber}}" data-name="{{x.VehicleName}}" data-category="{{x.Category}}" data-status="{{x.Status}}" data-makecode="{{x.MakeCode}}" data-model="{{x.Model}}" data-colour="{{x.Colour}}" data-transmission="{{x.Transmission}}" data-fueltype="{{x.FuelType}}" data-body="{{x.Body}}" data-cylinders="{{x.Cylinders}}" data-doorcount={{x.DoorCount}} data-enginecapacity="{{x.EngineCapacity}}" data-price="{{DataPrice}}" data-year="{{x.Year}}" data-km="{{x.Kilometres}}">
    <div class="vse-full-border">  
        <div class="vse-image-container">
            <a href="{{x.Url}}"><img alt="{{x.VehicleName}}" data-original="/files/images/{{x.StockNumber}}_1.jpg{{thumbnail}}&time={{globals.site.dateNow | date:'ffff'}}" class="lazy vse-image" src="/_System/Includes/vse2/images/vse-placeholder.jpg" /></a>
        </div>
        
        <div class="small-12 columns vse-details1-container text-right">
            <h4 class="vse-vehiclename">{{x.Year}} {{x.VehicleName}}</h4>            
            <div class="vse-modeldescription">{{x.ModelDescription}}</div>
        </div>
        <div class="clearfix"></div>         
        <hr/>
        
        <div class="small-12 columns vse-details2-container text-right">
            <h4 class="vse-price">
                {% if {{DataPrice}} != '0' %}
                	{{DataPrice}}
                {% else %}
                	POA
                {% endif %}
            </h4> 
            {% if {{x.Highlight}} != ''%}<div class="vse-highlight"><i class="fa fa-star yellow"></i> {{x.Highlight}}</div>{% endif %}
            
            <div class="vse-other-details">
                <div class="row">
                    <div class="large-7 medium-7 small-6 columns vse-datalabel vse-bold">
                        &gt; Transmission:
                    </div>
                    <div class="large-5 medium-5 small-6 columns vse-datavalue">
                        {{x.Transmission}}
                    </div>
                </div>
                <div class="row">
                    <div class="large-7 medium-7 small-6 columns vse-datalabel vse-bold">
                        &gt; Fuel:
                    </div>
                    <div class="large-5 medium-5 small-6 columns vse-datavalue">
                        {{x.FuelType}}
                    </div>
                </div>
                <div class="row">
                    <div class="large-7 medium-7 small-6 columns vse-datalabel vse-bold">
                        &gt; Odometer:
                    </div>
                    <div class="large-5 medium-5 small-6 columns vse-datavalue comma">
                        {{x.Kilometres}} km
                    </div>
                </div>
                <div class="row">
                    <div class="large-7 medium-7 small-6 columns vse-datalabel vse-bold">
                        &gt; Stock Number:
                    </div>
                    <div class="large-5 medium-5 small-6 columns vse-datavalue ucase">
                        {{x.StockNumber}}
                    </div>
                </div>
            </div>
            
        </div>
        <div class="clearfix"></div>              
        <div class="small-12 vse-button-container text-center">
            <a class="vse-button1" href="{{x.Url}}">See Vehicle Details <b><span class="fa fa-angle-right bold" style="color:inherit"></span></b></a>
        </div>       
    </div>
</div>
uniform vec2 g_Resolution;
uniform sampler2D m_Texture;

varying vec2 texCoord;

float random(vec3 scale,float seed){
    return fract(sin(dot(gl_FragCoord.xyz+seed,scale))*43758.5453+seed);
}

void main() {

    vec2 delta=vec2(0.002);
    vec4 color=vec4(0.0);
    float total=0.0;
    float offset=random(vec3(12.9898,78.233,151.7182),0.0);
    for(float t=-30.0;t<=30.0;t++){
    float percent=(t+offset-0.5)/30.0;
        float weight=1.0-abs(percent);
        vec4 sample=texture2D(m_Texture,texCoord+delta*percent);
        sample.rgb*=sample.a;
        color+=sample*weight;
        total+=weight;
    }
	
    gl_FragColor=color/total;
    gl_FragColor.rgb/=gl_FragColor.a+0.00001;
	
}
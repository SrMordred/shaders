#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_tex0;

// Plot a line on Y using a value between 0.0-1.0
float plot(vec2 st) {    
    return smoothstep( 0.02,0.0, abs(st.y - st.x));
    
}

uniform vec2 center ;
uniform float force ;
uniform float size ;
uniform float thickness ;

void main() {
	vec2 UV = gl_FragCoord.xy/u_resolution;

    

    float mask = 
    (1.0 - smoothstep(size-0.1, size, length( UV - center ) )) *
    ( smoothstep(size-thickness - 0.1, size-thickness, length( UV - center ) ))
     ;

    vec2 disp = normalize( UV - center ) * force * mask;

    gl_FragColor = texture2D( u_tex0, UV - disp)  ;
    //gl_FragColor.rgb = vec3(mask);
}
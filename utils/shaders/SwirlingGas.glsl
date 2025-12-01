// Vortex by @XorDev — adapted as SwirlingGas
// https://www.shadertoy.com/view/wctXWN
void mainImage(out vec4 O, vec2 I)
{
    float i, z = fract(dot(I, sin(I))), d;
    for(O *= i; i++ < 1e2; O += (sin(z + vec4(6,2,4,0)) + 1.5) / d)
    {
        vec3 p = z * normalize(vec3(I + I, 0) - iResolution.xyy);
        p.z += 6.0;
        for(d = 1.0; d < 9.0; d /= 0.8)
            p += cos(p.yzx * d - iTime) / d;
        z += d = 0.002 + abs(length(p) - 0.5) / 4e1;
    }
    O = tanh(O / 7e3);
}
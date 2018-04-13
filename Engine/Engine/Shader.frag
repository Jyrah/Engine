#version 330 core
out vec4 FragColor;

in vec2 myTexCoord;

uniform sampler2D texture1;
uniform sampler2D texture2;

void main()
{
    FragColor = mix(texture(texture1, myTexCoord), texture(texture2, myTexCoord), 0.2);
}
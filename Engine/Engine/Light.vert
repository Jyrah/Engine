#version 330 core
layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aNormal;
layout (location = 2) in vec2 aTexCoords;

out vec3 FragPos;
out vec3 Normal;
out vec2 TexCoords;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;
uniform vec3 posP;
uniform float time;

void main()
{
	float phase = 0.5 * time;
	float freq = 1.0;
	float amplitude = 0.5;
	vec3 pos = vec3(model * vec4(aPos, 1.0));

	float angle = (pos.z + phase) * freq;

	vec3 offSet = vec3(0.0, sin(angle) * amplitude, 0.0);
	FragPos = pos + offSet + posP;
	vec3 norm = vec3(-amplitude * freq * cos(angle), 1.0, 0.0);
	Normal = mat3(transpose(inverse(model))) * norm;
	TexCoords = aTexCoords;

	gl_Position = projection * view * model * vec4(aPos + offSet + posP, 1.0);
}

/*void main()
{
	FragPos = vec3(model * vec4(aPos, 1.0));
	Normal = mat3(transpose(inverse(model))) * aNormal;
	TexCoords = aTexCoords;

	gl_Position = projection * view * model * vec4(aPos, 1.0);
}*/
#version 330 core

in vec3 Normal;  
in vec3 FragPos;
in vec2 TexCoords;

struct Material {
    sampler2D diffuse;
	sampler2D specular;
	sampler2D emission;
    float shininess;
};

struct Light {
	vec3 position;

	vec3 ambient;
	vec3 diffuse;
	vec3 specular;
};

uniform Light light;
uniform Material material;
uniform vec3 viewPos;  
uniform float time;

out vec4 FragColor;

void main()
{
	//Ambient Lighting
	vec3 ambientLight = light.ambient * texture(material.diffuse, TexCoords).rgb;

	//Diffuse Lighting
	vec3 norm = normalize(Normal);
	vec3 lightDir = normalize(light.position - FragPos); 
	float diff = max(dot(norm, lightDir), 0.0);
	vec3 diffuseLight = light.diffuse * diff * texture(material.diffuse, TexCoords).rgb;

	//Specular Lighting
	vec3 viewDir = normalize(viewPos - FragPos);
	vec3 reflectDir = reflect(-lightDir, norm);
	float spec = pow(max(dot(viewDir, reflectDir), 0.0), material.shininess);
	vec3 specular = light.specular * spec * texture(material.specular, TexCoords).rgb;

	//Emission Lighting
    vec3 emission = vec3(0.0);
   // if (texture(material.specular, TexCoords).rgb == 0.0)   /*rough check for blackbox inside spec texture */
    //{
        //apply emission texture
        emission = texture(material.emission, TexCoords).rgb;
        
        //some extra fun stuff with "time uniform"
        emission = texture(material.emission, TexCoords + vec2(0.0,time)).rgb;   /*moving */

    //}

	vec3 result = ambientLight + diffuseLight + specular /*+ emission*/;
    FragColor = vec4(result, 1.0);
}
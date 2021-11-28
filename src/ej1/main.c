#include <stdio.h>
#include <string.h>

typedef struct conf {
    int port;
    int backLog;
    char *archStr;
};

struct conf load_conf(char *filename) {
    struct conf config;
    
    FILE *fp;
    fp = fopen(filename, 'r');
    char file[2048];
    fgets(file, 2048, (FILE*)fp);
    char *settings[3];

    char *setting = strtok(file, "\n");
    for (int i = 0; i <= 3; i++) {
        settings[i] = setting;
        setting = strtok(NULL, "\n");
    }
    
    for (int i = 0; i <= 3; i++) {
        setting = strtok(settings[i], "=");
        char *value = strtok(NULL, "=");

        if (strcmp(setting, "PORT")) {
            config.port = atoi(value);
        } else if (strcmp(setting, "BACKLOG")) {
            config.backLog = atoi(value);
        } else if (strcmp(setting, "ARCHIVOS")) {
            // ACABO DE LEER QUE NO SE PUEDE USAR STRTOK ESTOY RE CONTENTO 
        }
    }

    return config;
}

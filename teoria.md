# Teoría

1. Se puede esperar al hijo:
    * Usando la funcion `wait()` en el padre, se indica que se debe esperar a que termine el proceso hijo. 
    ```c
    #include <sys/wait.h>

	int main(void) {
		int pid = fork();
		if (pid == 0) {
			// proceso hijo
		}
		else {
			// proceso padre
			wait(NULL);
			// terminó el proceso hijo
		}
	}
    ```
    * Ignorando la señal `SIGCHLD`, para que cuando termine el proceso hijo, el sistema ignore la señal de que terminó, eliminando el proceso de la tabla de procesos. La desventaja es que no se puede saber cuando el proceso hijo termina.
    ```c
    int main(void) {
		int pid = fork();
		if (pid == 0) {
			// proceso hijo
		}
		else {
			signal(SIGCHLD, SIG_IGN);
			// proceso padre
		}
	}
    ```
    * Usando un signal handler, el proceso padre puede escuchar la señal `SIGCHLD` y ejecutar una función cuando esta se dispare.
    ```c
    void fun() {
        // terminó el proceso hijo
    }
    int main(void) {
		int pid = fork();
		if (pid == 0) {
			// proceso hijo
		}
		else {
			signal(SIGCHLD, fun);
			// proceso padre
		}
	}
    ```
2. Un proceso se puede interrumpir de numerosas maneras, y cada una de ellas emite una señal distinta. Entre las señales más comunes se encuentran `SIGTERM`, `SIGINT` y `SIGKILL`. Estas se pueden escuchar con un signal handler, igual que en ejemplo anterior, con excepción del `SIGKILL`, el cual mata instantáneamente el proceso, sin dar tiempo a interpretar la señal.
3.  .
    ```mermaid
    graph TD
    subgraph SERVER
        s1["socket()"]
        s1 --> s2["bind()"]
        s2 --> s3["listen()"]
        s3 --> s4["accept()"]
        s4 --> s5["read() y espera"]
        s5 --> s6[["Procesar request"]]
        s6 --> s7["write()"]
        s7 --> s8["close()"]
    end
    subgraph CLIENT
        c1["socket()"]
        c1 --> c2["connect()"]
        c2 --> c3["write()"]
        c3 --> c4["read() y espera"]
        c4 --> c5["close()"]
    end
    c2 -- Se conecta --> s4
    c3 -- Request --> s5
    s7 -- Response --> c4    
    c5 -- Fin de conexión --> s8 
    ```
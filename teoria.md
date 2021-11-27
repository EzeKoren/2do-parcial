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

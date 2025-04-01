FROM jenkins/jenkins:lts-jdk17

USER root

# ติดตั้ง Docker CLI
RUN apt-get update && apt-get install -y lsb-release
RUN curl -fsSLo /usr/share/keyrings/docker-archive-keyring.asc \
  https://download.docker.com/linux/debian/gpg
RUN echo "deb [arch=$(dpkg --print-architecture) \
  signed-by=/usr/share/keyrings/docker-archive-keyring.asc] \
  https://download.docker.com/linux/debian \
  $(lsb_release -cs) stable" > /etc/apt/sources.list.d/docker.list
RUN apt-get update && apt-get install -y docker-ce-cli

# ติดตั้ง Node.js
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt-get install -y nodejs

# ติดตั้งเครื่องมืออื่นๆ ถ้าจำเป็น
RUN apt-get install -y git

# กลับไปใช้ Jenkins user
USER jenkins

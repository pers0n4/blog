---
title: GitHub에서 협업을 위한 remote repository와 upstream 이해하기
date: 2020-10-20T20:39:39+09:00
dateModified: 2021-06-09T11:25+09:00
category: Git
tags: [Git, GitHub]
---

Git은 현재 소프트웨어 개발에 사용되는 널리 알려진 버전 관리 시스템으로 '분산 버전 관리 시스템' 중 하나입니다. 버전 관리 시스템에서 분산이라는 말은 사용자가 원격 서버를 거치지 않고서도 버전을 관리할 수 있다는 뜻으로, 중앙집중식인 서버-클라이언트 모델과 비교했을 때 갖는 가장 큰 특징이라고 할 수 있습니다. 따라서 이런 특징을 잘 알아야 git을 잘 사용할 수 있다는 뜻이기도 한데, 이번에는 GitHub에서의 협업을 돕기 위한 목적으로 git의 구조와 개념을 최대한 간단히(?) 소개해보고자 합니다.

## Git != GitHub

깃을 처음 사용하는 사람들이 자주 하는 오해는 아마 'Git과 GitHub는 같다'는 생각일 겁니다. 그도 그럴 게 깃이라고 하면 보통 깃허브가 붙어 나오기 때문에 착각하기 딱 좋은 환경이거든요. 오죽하면 Git이라는 시스템보다 GitHub라는 서비스를 먼저 알게 된 사람도 많을 정도죠.

GitHub는 Git을 바탕으로 하는 [코드 호스팅 플랫폼](https://guides.github.com/activities/hello-world/#what)입니다. GitHub와 GitLab, Bitbucket처럼 보통 네트워크상의 서버에 있는 저장소를 **remote repository**라고 부른답니다. 그리고 이런 remote에 있는 저장소를 `git clone`하거나, `git init`으로 생성해서 로컬에 존재하는 repository를 **local repository**라고 하죠.

> 원격 서버에 있는 모든 repository는 remote지만, 로컬 시스템에 위치한 repository가 remote가 될 수도 있습니다.

## Local & Remote

편의상 로컬 머신에 존재하는 모든 repository는 local이고 GitHub에 존재하는 모든 repository는 remote라고 말하겠습니다. 우선 로컬에 repository를 만드는 방법은 위에서 말한 것처럼 크게 두 가지가 있습니다.

1. 로컬에서 `git init`으로 새로운 git repository 생성
2. 깃허브에서 새로운 repository를 만든 후 `git clone`해서 가져오기[^1]

이렇게 만든 local과 remote는 모두 _그 자체로 완전한_ 버전 관리 시스템입니다[^2]. 그래서 local과 remote의 작업 내용을 서로 반영하기 위해 `push`와 `pull`이라는 작업을 하게 됩니다.

- `push`는 local에서 remote로 commit 이력을 업로드하는 것
- `pull`은 remote에서 local로 commit 이력을 다운로드하는 것

어때요, 참 쉽죠? (...)

> 중앙집중식 버전 관리 시스템의 대표적인 예인 아파치 서브버전(SVN, Subversion)은 서버와 통신이 불가능한 상황에서 버전 관리를 수행할 수 없습니다.

## Upstream & Downstream

GitHub에서 repo를 생성하고 나면 다들 **origin**이라는 용어를 보셨을 겁니다. `clone`했을 때는 origin이 자동으로 등록돼있고, `init`했을 때는 `git remote add origin ...`으로 origin을 직접 등록하라고 안내하죠. 여기서 말하는 origin이 깃허브에 존재하는 repository 즉, remote를 뜻하는 단어입니다. 다만 remote에 origin이라는 이름을 붙인 것뿐이랍니다.

upstream과 downstream은 _상대적인 개념_이라 origin과 local을 기준으로 생각하면 origin이 upstream, local이 downstream이 됩니다. 그 이유는 push와 pull을 기준으로 생각했을 때 origin으로부터 local로 흐르는 관계가 형성되기 때문입니다.

- local에서 origin으로 push한다
- origin에서 local로 pull한다

만약 CLI로 push를 해보셨다면 `git push -u origin main`[^3]이라는 명령어를 입력했을 텐데, 여기서 `-u` 옵션이 `--set-upstream` 옵션의 줄임으로 upstream을 설정한다는 뜻입니다. upstream을 한 번 설정하고 나면 다음부터는 `git push` 또는 `git pull`이라고 명령어만 입력해도 자동으로 origin의 main 브랜치로부터 push와 pull을 진행하는 이유가 upstream 옵션을 통해 해당 브랜치에서 upstream과 downstream 관계가 설정됐기 때문이죠.

## Fork

GitHub에서 오픈소스 프로젝트에 기여한다거나, 협업을 진행할 때 fork를 이용하게 됩니다. fork는 다른 사람의 repository를 내 소유의 repository로 복사하는 일이죠. 따라서 원래 소유자의 remote repository와 내가 fork한 remote repository 사이에도 upstream과 downstream이라는 관계가 형성된답니다. 그래서 보통 _원래 소유자의 remote_를 말할 때 `upstream`, _내가 포크한 remote_를 말할 때 `origin`이라는 용어를 사용하곤 합니다.

앞서 upstream과 downstream은 상대적인 개념이라 소개했었는데, 이 부분이 fork를 했을 때 혼란스러울 수도 있으리라 생각합니다. local과 origin의 관계에선 local이 downstream, origin이 upstream이었는데, fork한 repository를 기준으로 보면 origin이 downstream, 원본 remote가 upstream이라는 관계가 되니까요. 그래서 GitHub로 협업을 할 때는 보통 다음과 같은 프로세스를 거치게 됩니다.

1. '원본 remote repository'(upstream)를 깃허브에서 fork
2. 'fork한 remote repository'(origin)를 깃 클라이언트로 clone
3. 기능을 완성할 때까지 반복
   1. 'clone한 repository'(local)에 commit
   2. local에서 origin으로 push
4. upstream에 반영하기
   1. PR을 등록하기 전 upstream에 **바뀐 내용이 없는 경우**
      1. origin에서 upstream으로 PR(Pull Request)
   2. PR을 등록하기 전 upstream에 **바뀐 내용이 있는 경우**
      1. upstream을 local로 pull
      2. local에서 origin으로 push
      3. origin에서 upstream으로 PR(Pull Request)

fork를 했을 때는 upstream에 바뀐 내용이 있을 때 origin에도 반영해주는 작업이 한 단계 추가됐답니다. 혹시 여기까지 이해가 안 되거나, 추가로 궁금한 내용이 있으면 댓글로 질문 남겨주시면 제가 알고 있는 범위 내로(?) 알려드리겠습니다.

*[분산 버전 관리 시스템]: DVCS, Distributed Version Control System
*[저장소]: repository

[^1]: Git CLI에 익숙하지 않아서 GUI 프로그램을 사용하는 분들은 보통 2번의 방법으로 repository를 가져오시더라고요.
[^2]: remote에서 저장소를 처음 내려받는 명령어가 clone인 걸 생각하면 딱 알맞죠?
[^3]: GitHub의 기본 branch 이름이 master에서 main으로 바뀌었습니다. <https://github.com/github/renaming>

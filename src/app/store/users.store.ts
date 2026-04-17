import { HttpErrorResponse } from '@angular/common/http';
import { computed, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { GetUsers$Params } from '@core/api/client/fn/users/get-users';
import { UsersService } from '@core/api/client/services';
import { User } from '@pages/users/model/user';

export const UsersStore = signalStore(
  { providedIn: 'root' },
  withState({
    apiParams: {} as GetUsers$Params,
  }),
  withComputed((state, usersService = inject(UsersService)) => {
    const usersRes = rxResource({
      params: () => state.apiParams(),
      stream: ({ params }) => usersService.getUsers(params).pipe(
          map((res) => res.data.map(user => new User(user))),
      ),
    });

    const users = computed(() => {
      if (usersRes.status() === 'error') {
        return [];
      }

      // Особенности value() - если упала ошибка, то нельзя обращаться к упавшему value
      return usersRes.value() || [];
    });

    const error = computed(() => {
      const err = usersRes.error();
      if (!err) return null;

      if (err instanceof HttpErrorResponse) {
        return err.error?.message || 'Unknown Server Error';
      }

      return 'An unexpected error occurred';
    });

    return {
      users,
      isLoading: usersRes.isLoading,
      error,
      // Прокидываем сам объект ресурса как функцию, чтобы иметь возможность вызывать reload
      usersResource: () => usersRes,
    };
  }),
  withMethods((store) => ({
    updateParams(partialParams: Partial<GetUsers$Params>) {
      patchState(store, (state) => ({
        apiParams: { ...state.apiParams, ...partialParams },
      }));
    },

    clearParams() {
      patchState(store, { apiParams: {} });
    },

    reload() {
      store.usersResource().reload();
    },
  })),
);
